import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { DoctorsService } from "../../doctors/doctors.service";
import { Doctor } from "../../doctors/models/doctor.models";
import { SignInDto } from "../dto/sign-in.dto";
import * as bcrypt from "bcrypt";
import { Response } from "express";

@Injectable()
export class AuthDoctorService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly doctorService: DoctorsService
  ) {}

  async generateTokens(doctor: Doctor) {
    const payload = {
      id: doctor.id,
      is_active: doctor.is_active,
      role: "doctor",
      email: doctor.email,
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
  async signIn(signIndto: SignInDto, res: Response) {
    const doctor = await this.doctorService.findByEmail(signIndto.email);
    if (!doctor) {
      throw new BadRequestException("Email yoki password");
    }
    const isValid = await bcrypt.compare(signIndto.password, doctor.password);
    if (!isValid) {
      throw new BadRequestException("Email yoki password");
    }
    const { accessToken, refreshToken } = await this.generateTokens(doctor);

    res.cookie("doctor_refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    try {
      doctor.refresh_token = await bcrypt.hash(refreshToken, 7);
      await doctor.save();
    } catch (error) {
      console.error("Tokenni saqlashda xatolik:", error);
    }

    return { message: "xush kordik Doctor", accessToken };
  }

  async signOut(refresh_token: string, res: Response) {
    const userData = this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("Ushbu doctor uchun emas");
    }

    const hashed_refresh_token = null;
    await this.doctorService.updateRefreshToken(
      userData.id,
      hashed_refresh_token!
    );

    res.clearCookie("doctor_refresh_token");

    return { message: "Eson-omon chiqib olding" };
  }

  async doctorRefreshToken(id: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);

    if (id !== decodedToken.id) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }
    const user = await this.doctorService.findOne(id);
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

    res.cookie("doctor_refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return {message:"Doctor", accessToken: tokens.accessToken };
  }
}
