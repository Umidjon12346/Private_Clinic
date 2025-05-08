import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { DoctorSchedule } from "../../doctor_schedules/models/doctor_schedule.model";
import { PatientService } from "../../patient_services/models/patient_service.model";
import { MedicalRecord } from "../../medical_records/models/medical_record.model";
import { Appointment } from "../../appointments/models/appointment.model";

interface IDoctorCreationAttr {
  full_name: string;
  specialization: string;
  phone: string;
  email: string;
  password: string;
  department: string;
}

@Table({ tableName: "doctors" })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique ID of the doctor" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Dr. Sarah Smith",
    description: "Full name of the doctor",
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare full_name: string;

  @ApiProperty({
    example: "Cardiologist",
    description: "Doctor specialization",
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare specialization: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Contact phone number",
  })
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  declare phone: string;

  @ApiProperty({ example: "doctor@example.com", description: "Email address" })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  declare email: string;

  @ApiProperty({ example: "hashed_password", description: "Hashed password" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @ApiProperty({ example: "Cardiology", description: "Medical department" })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare department: string;

  @ApiProperty({
    example: "refresh_token_value",
    description: "Refresh token for auth",
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare refresh_token: string;

  @ApiProperty({
    example: "2023-01-15",
    description: "Date when doctor was hired",
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  declare hired_at: Date;

  @ApiProperty({
    example: "uuid-activation-link",
    description: "Email activation link",
  })
  @Column({
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4(),
  })
  declare activation_link: string;

  @ApiProperty({ example: true, description: "Is the doctor active?" })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare is_active: boolean;

  @HasMany(() => DoctorSchedule)
  declare schedules: DoctorSchedule[];
  
  @HasMany(() => PatientService)
  declare patient_services: PatientService[];

  @HasMany(() => MedicalRecord)
  declare medical_records: MedicalRecord[];

  @HasMany(() => Appointment)
  declare appointments: Appointment[];
}
