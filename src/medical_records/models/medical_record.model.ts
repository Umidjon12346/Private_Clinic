import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.models";
import { AnalysisResult } from "../../analysis_results/models/analysis_result.model";


interface IMedicalRecordCreationAttr {
  patient_id: number;
  doctor_id: number;
  diagnosis: string;
  treatment: string;
}

@Table({ tableName: "medical_records" })
export class MedicalRecord extends Model<
  MedicalRecord,
  IMedicalRecordCreationAttr
> {
  @ApiProperty({ example: 1, description: "Unique ID of the medical record" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 123, description: "ID of the patient" })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare patient_id: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @ApiProperty({ example: 456, description: "ID of the treating doctor" })
  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare doctor_id: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @ApiProperty({ example: "Type 2 Diabetes", description: "Diagnosis" })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare diagnosis: string;

  @ApiProperty({
    example: "Insulin therapy, diet control",
    description: "Prescribed treatment",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare treatment: string;

  @HasMany(() => AnalysisResult)
  analysis_results: AnalysisResult[];
}
