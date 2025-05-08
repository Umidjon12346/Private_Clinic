import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment)
    private readonly appointmentModel: typeof Appointment
  ) {}
  create(createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentModel.create(createAppointmentDto);
  }

  findAll() {
    return this.appointmentModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.appointmentModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const [count, updated] = await this.appointmentModel.update(
      updateAppointmentDto,
      {
        where: { id },
        returning: true,
      }
    );
    return count > 0 ? updated[0] : null;
  }

  async remove(id: number) {
    const deleted = await this.appointmentModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "ochib olib kettii";
    }
    return "ochirmaaaa";
  }
}
