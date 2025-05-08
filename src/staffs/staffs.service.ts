import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';
import * as bcrypt from "bcrypt"

@Injectable()
export class StaffsService {
  constructor(@InjectModel(Staff) private readonly staffModel: typeof Staff) {}

  async create(createStaffDto: CreateStaffDto) {
    const { password } = createStaffDto;
    const hashed_password = await bcrypt.hash(password, 7);

    const newUser = await this.staffModel.create({
      ...createStaffDto,
      password: hashed_password,
    });
    return newUser;
  }

  findAll() {
    return this.staffModel.findAll();
  }

  findOne(id: number) {
    return this.staffModel.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.staffModel.findOne({ where: { email } });
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const [count, updated] = await this.staffModel.update(updateStaffDto, {
      where: { id },
      returning: true,
    });
    return count > 0 ? updated[0] : null;
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    const updatedUser = await this.staffModel.update(
      { refresh_token },
      { where: { id } }
    );
    return updatedUser;
  }

  async remove(id: number) {
    const deleted = await this.staffModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "ochib olib kettii";
    }
    return "ochirmaaaa";
  }
}
