import { BadRequestException, ConflictException, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Staff } from "../../staffs/models/staff.model";
import * as bcrypt from "bcrypt"
import { SignInDto } from "../dto/sign-in.dto";
import { Response } from "express";
import { CreateStaffDto } from "../../staffs/dto/create-staff.dto";
import { Patient } from "../../patients/models/patient.model";
import { PatientsService } from "../../patients/patients.service";
import { CreatePatientDto } from "../../patients/dto/create-patient.dto";

@Injectable()
export class AuthPatientService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly patientService:PatientsService
  ) {}

  async generateTokens(patient:Patient) {
    const payload = {
      id: patient.id,
      is_active: patient.is_active,
      role: "patient",
      email: patient.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(createPatientDto:CreatePatientDto) {
    const candidate = await this.patientService.findByEmail(
      createPatientDto.email
    );
    if (candidate) {
      throw new ConflictException("bunday emailli patient bor");
    }

    const newUser = await this.patientService.create(createPatientDto);
    return { message: "Foydalanuvchi qoshildida", userId: newUser.id };
  }

  async signIn(signIndto: SignInDto, res: Response) {
    const staff = await this.patientService.findByEmail(signIndto.email);
    if (!staff) {
      throw new BadRequestException("Email yoki password");
    }
    const isValid = await bcrypt.compare(signIndto.password, staff.password);
    if (!isValid) {
      throw new BadRequestException("Email yoki password");
    }
    const { accessToken, refreshToken } = await this.generateTokens(staff);

    res.cookie("patient_refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    try {
      staff.refresh_token = await bcrypt.hash(refreshToken, 7);
      await staff.save();
    } catch (error) {
      console.error("Tokenni saqlashda xatolik:", error);
    }

    return { message: "xush kormidik patient", accessToken };
  }

  async signOut(refresh_token: string, res: Response) {
    const userData = this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("Staff uchun emas");
    }

    const hashed_refresh_token = null;
    await this.patientService.updateRefreshToken(
      userData.id,
      hashed_refresh_token!
    );

    res.clearCookie("patient_refresh_token");

    return { message: "Eson-omon chiqib olding" };
  }

  async staffRefreshToken(id: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);

    if (id !== decodedToken.id) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }
    const user = await this.patientService.findOne(id);
    if (!user || !user.refresh_token) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }
    const match = await bcrypt.compare(refresh_token, user.refresh_token);
    if (!match) {
      throw new ForbiddenException("Refresh token mos emas");
    }

    const tokens = await this.generateTokens(user);

    user.refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await user.save();

    res.cookie("patient_refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return { accessToken: tokens.accessToken };
  }
}
