import { Module } from '@nestjs/common';
import { PatientServicesService } from './patient_services.service';
import { PatientServicesController } from './patient_services.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientService } from './models/patient_service.model';

@Module({
  imports:[SequelizeModule.forFeature([PatientService])],
  controllers: [PatientServicesController],
  providers: [PatientServicesService],
})
export class PatientServicesModule {}
