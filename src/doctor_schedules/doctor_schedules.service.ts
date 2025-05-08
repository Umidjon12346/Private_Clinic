import { Injectable } from "@nestjs/common";
import { CreateDoctorScheduleDto } from "./dto/create-doctor_schedule.dto";
import { UpdateDoctorScheduleDto } from "./dto/update-doctor_schedule.dto";
import { InjectModel } from "@nestjs/sequelize";
import { DoctorSchedule } from "./models/doctor_schedule.model";

@Injectable()
export class DoctorSchedulesService {
  constructor(
    @InjectModel(DoctorSchedule)
    private readonly doctoeScheduleModel: typeof DoctorSchedule
  ) {}

  create(createDoctorScheduleDto: CreateDoctorScheduleDto) {
    return this.doctoeScheduleModel.create(createDoctorScheduleDto);
  }

  findAll() {
    return this.doctoeScheduleModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.doctoeScheduleModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateDoctorScheduleDto: UpdateDoctorScheduleDto) {
    const [count, updated] = await this.doctoeScheduleModel.update(
      updateDoctorScheduleDto,
      {
        where: { id },
        returning: true,
      }
    );
    return count > 0 ? updated[0] : null;
  }

  async remove(id: number) {
    const deleted = await this.doctoeScheduleModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "ochib olib kettii";
    }
    return "ochirmaaaa";
  }
}
