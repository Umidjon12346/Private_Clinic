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
import { Service } from "../../services/models/service.model";

interface IPatientServiceCreationAttr {
  patient_id: number;
  service_id: number;
  doctor_id: number;
  notes?: string;
}

@Table({ tableName: "patient_services" })
export class PatientService extends Model<
  PatientService,
  IPatientServiceCreationAttr
> {
  @ApiProperty({ example: 1, description: "Unique record ID" })
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

  @ApiProperty({ example: 1, description: "Service ID" })
  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare service_id: number;

  @BelongsTo(() => Service)
  service: Service;

  @ApiProperty({ example: 1, description: "Doctor ID" })
  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare doctor_id: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @ApiProperty({ example: "2023-06-15", description: "Service usage date" })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare used_at: Date;

  @ApiProperty({
    example: "Special instructions",
    description: "Service notes",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare notes: string;
}
