import { Injectable } from "@nestjs/common";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.models";
import * as bcrypt from "bcrypt";

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor) private readonly doctorModel: typeof Doctor
  ) {}
  async create(createDoctorDto: CreateDoctorDto) {
    const { password } = createDoctorDto;
    const hashed_password = await bcrypt.hash(password, 7);

    const newDoctor = await this.doctorModel.create({
      ...createDoctorDto,
      password: hashed_password,
    });
    return newDoctor;
  }

  findAll() {
    return this.doctorModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.doctorModel.findByPk(id);
  }

  findByEmail(email: string) {
    return this.doctorModel.findOne({ where: { email } });
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const [count, updated] = await this.doctorModel.update(updateDoctorDto, {
      where: { id },
      returning: true,
    });
    return count > 0 ? updated[0] : null;
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedUser = await this.doctorModel.update(
      { refresh_token },
      { where: { id } }
    );
    return updatedUser;
  }

  async remove(id: number) {
    const deleted = await this.doctorModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "ochib olib kettii";
    }
    return "ochirmaaaa";
  }
}
