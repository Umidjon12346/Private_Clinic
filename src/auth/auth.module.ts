import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { StaffsModule } from '../staffs/staffs.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { PatientsModule } from '../patients/patients.module';
import { AuthStaffController } from './auth-staff/auth-staff.controller';
import { AuthStaffService } from './auth-staff/auth-staff.service';
import { AuthDoctorController } from './auth-doctor/auth-doctor.controller';
import { AuthDoctorService } from './auth-doctor/auth-doctor.service';
import { AuthPatientController } from './auth-patient/auth-patient.controller';
import { AuthPatientService } from './auth-patient/auth-patient.service';

@Module({
  imports:[JwtModule.register({ global: true }),StaffsModule,DoctorsModule,PatientsModule],
  controllers: [AuthStaffController,AuthDoctorController,AuthPatientController],
  providers: [AuthStaffService,AuthDoctorService,AuthPatientService],
})
export class AuthModule {}
