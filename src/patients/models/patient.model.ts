import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Appointment } from "../../appointments/models/appointment.model";
import { Payment } from "../../payments/models/payment.model";
import { PatientService } from "../../patient_services/models/patient_service.model";
import { MedicalRecord } from "../../medical_records/models/medical_record.model";

interface IPatientCreationAttr {
  full_name: string;
  birth_date: Date;
  gender?: string;
  phone?: string;
  address?: string;
  email: string;
  password: string;
}

@Table({ tableName: "patients" })
export class Patient extends Model<Patient, IPatientCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique patient ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "John Doe", description: "Full patient name" })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare full_name: string;

  @ApiProperty({ example: "1990-01-01", description: "Date of birth" })
  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare birth_date: Date;

  @ApiProperty({ example: "Male", description: "Gender" })
  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  declare gender: string;

  @ApiProperty({ example: "+1234567890", description: "Contact phone" })
  @Column({
    type: DataType.STRING(20),
    allowNull: true,
    unique: true,
  })
  declare phone: string;

  @ApiProperty({ example: "123 Main St", description: "Physical address" })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare address: string;

  @ApiProperty({ example: "patient@example.com", description: "Email address" })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  declare email: string;

  @ApiProperty({ example: "hashed_password", description: "Password hash" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @ApiProperty({ example: "refresh_token", description: "JWT refresh token" })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare refresh_token: string;

  @ApiProperty({ example: true, description: "Account active status" })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @ApiProperty({ example: "2023-01-01", description: "Registration date" })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare registered_at: Date;

  @Column({
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4(),
  })
  declare activation_link: string;

  @HasMany(() => Appointment)
  appointments: Appointment[];

  @HasMany(() => Payment)
  payments: Payment[];

  @HasMany(() => PatientService)
  services: PatientService[];

  @HasMany(() => MedicalRecord)
  medical_records: MedicalRecord[];
}
