import { Injectable } from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import * as bcrypt from "bcrypt"
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const { password } = createPatientDto;
    const hashed_password = await bcrypt.hash(password, 7);

    const newUser = await this.patientModel.create({
      ...createPatientDto,
      password: hashed_password,
    });
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
}
