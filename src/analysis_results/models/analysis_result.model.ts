import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { MedicalRecord } from "../../medical_records/models/medical_record.model";
import { Service } from "../../services/models/service.model";

interface IAnalysisResultCreationAttr {
  medical_id: number;
  service_id: number;
  result: string;
  result_value: string;
  normal_range: string;
  result_date: Date;
  file_path: string;
}

@Table({ tableName: "analysis_results" })
export class AnalysisResult extends Model<
  AnalysisResult,
  IAnalysisResultCreationAttr
> {
  @ApiProperty({ example: 1, description: "Unique ID of the lab result" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 789, description: "Related medical record ID" })
  @ForeignKey(() => MedicalRecord)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare medical_id: number;

  @BelongsTo(() => MedicalRecord)
  medical_record: MedicalRecord;

  @ApiProperty({ example: 101, description: "Service/test performed ID" })
  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare service_id: number;

  @BelongsTo(() => Service)
  service: Service;

  @ApiProperty({ example: "Positive", description: "Qualitative result" })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare result: string;

  @ApiProperty({ example: "6.5%", description: "Quantitative result value" })
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare result_value: string;

  @ApiProperty({ example: "4.0-5.6%", description: "Normal reference range" })
  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare normal_range: string;

  @ApiProperty({
    example: "2023-05-15",
    description: "Date when result was obtained",
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  declare result_date: Date;

  @ApiProperty({
    example: "/uploads/results/report123.pdf",
    description: "Path to result file",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare file_path: string;
}
