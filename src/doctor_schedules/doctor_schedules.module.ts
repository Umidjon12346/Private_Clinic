import { Module } from '@nestjs/common';
import { DoctorSchedulesService } from './doctor_schedules.service';
import { DoctorSchedulesController } from './doctor_schedules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoctorSchedule } from './models/doctor_schedule.model';

@Module({
  imports:[SequelizeModule.forFeature([DoctorSchedule])],
  controllers: [DoctorSchedulesController],
  providers: [DoctorSchedulesService],
})
export class DoctorSchedulesModule {}
