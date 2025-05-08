import { BadRequestException, Injectable, ServiceUnavailableException } from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import * as bcrypt from "bcrypt"
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import { MailService } from "../mail/mail.service";
@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
    private readonly mailService: MailService
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const { password } = createPatientDto;
    const hashed_password = await bcrypt.hash(password, 7);

    let newUser;
    try {
      newUser = await this.patientModel.create({
        ...createPatientDto,
        password: hashed_password,
      });
    } catch (error) {
      console.error("User create error:", error);
      throw new BadRequestException("Foydalanuvchi yaratishda xatolik");
    }

    try {
      console.log("Sending email to:", newUser.email);
      await this.mailService.sendMail(newUser);
    } catch (error) {
      console.error("SendMail error:", error);
      throw new ServiceUnavailableException("Email yuborishda xatolik");
    }

    return newUser;
  }

  findAll() {
    return this.patientModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.patientModel.findByPk(id, { include: { all: true } });
  }

  findByEmail(email: string) {
    return this.patientModel.findOne({ where: { email } });
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const [count, updated] = await this.patientModel.update(updatePatientDto, {
      where: { id },
      returning: true,
    });
    return count > 0 ? updated[0] : null;
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedUser = await this.patientModel.update(
      { refresh_token },
      { where: { id } }
    );
    return updatedUser;
  }

  async remove(id: number) {
    const deleted = await this.patientModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "ochib olib kettii";
    }
    return "ochirmaaaa";
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link topilmadi");
    }

    const updatedUser = await this.patientModel.update(
      { is_active: true },
      {
        where: { activation_link: link, is_active: false }, 
        returning: true,
      }
    );

    if (!updatedUser[1][0]) {
      throw new BadRequestException(
        "Foydalanuvchi allaqachon faollashtirilgan yoki noto'g'ri link"
      );
    }

    return {
      message: "Foydalanuvchi muvaffaqiyatli faollashtirildi",
      is_active: updatedUser[1][0].is_active,
    };
  }
}
