import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { StaffsModule } from "./staffs/staffs.module";
import { Staff } from "./staffs/models/staff.model";
import { DoctorsModule } from "./doctors/doctors.module";
import { DoctorSchedulesModule } from "./doctor_schedules/doctor_schedules.module";
import { DoctorSchedule } from "./doctor_schedules/models/doctor_schedule.model";
import { Doctor } from "./doctors/models/doctor.models";
import { ServicesModule } from "./services/services.module";
import { AnalysisResultsModule } from "./analysis_results/analysis_results.module";
import { MedicalRecordsModule } from "./medical_records/medical_records.module";
import { PatientsModule } from "./patients/patients.module";
import { AppointmentsModule } from "./appointments/appointments.module";
import { PatientServicesModule } from "./patient_services/patient_services.module";
import { PaymentsModule } from "./payments/payments.module";
import { Patient } from "./patients/models/patient.model";
import { PatientService } from "./patient_services/models/patient_service.model";
import { AnalysisResult } from "./analysis_results/models/analysis_result.model";
import { Service } from "./services/models/service.model";
import { Appointment } from "./appointments/models/appointment.model";
import { Payment } from "./payments/models/payment.model";
import { MedicalRecord } from "./medical_records/models/medical_record.model";
import { AuthModule } from './auth/auth.module';
import { MailModule } from "./mail/mail.module";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        Staff,
        DoctorSchedule,
        Doctor,
        Patient,
        PatientService,
        AnalysisResult,
        Service,
        Appointment,
        Payment,
        MedicalRecord,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    StaffsModule,
    DoctorsModule,
    DoctorSchedulesModule,
    ServicesModule,
    AnalysisResultsModule,
    MedicalRecordsModule,
    PatientsModule,
    AppointmentsModule,
    PatientServicesModule,
    PaymentsModule,
    AuthModule,
    MailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
