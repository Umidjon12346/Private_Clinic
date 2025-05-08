import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.models";

interface IAppointmentCreationAttr {
  patient_id: number;
  doctor_id: number;
  appointment_time: Date;
  reason?: string;
  status?: string;
}

@Table({ tableName: "appointments" })
export class Appointment extends Model<Appointment, IAppointmentCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique appointment ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 1, description: "Patient ID" })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare patient_id: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @ApiProperty({ example: 1, description: "Doctor ID" })
  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare doctor_id: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @ApiProperty({
    example: "2023-06-15 14:30:00",
    description: "Appointment datetime",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare appointment_time: Date;

  @ApiProperty({
    example: "Routine checkup",
    description: "Appointment reason",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare reason: string;

  @ApiProperty({
    example: "confirmed",
    description: "Appointment status",
    enum: ["pending", "confirmed", "cancelled", "completed"],
  })
  @Column({
    type: DataType.ENUM("pending", "confirmed", "cancelled", "completed"),
    defaultValue: "pending",
  })
  declare status: string;
}
