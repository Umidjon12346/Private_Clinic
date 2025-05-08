import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { AnalysisResult } from "../../analysis_results/models/analysis_result.model";
import { PatientService } from "../../patient_services/models/patient_service.model";

interface IServiceCreationAttr {
  name: string;
  description?: string;
  price: number;
  is_active?: boolean;
}

@Table({ tableName: "services" })
export class Service extends Model<Service, IServiceCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique ID of the service" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: "Complete Blood Count",
    description: "Name of the service",
  })
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @ApiProperty({
    example: "Measures various blood components",
    description: "Service description",
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;

  @ApiProperty({ example: 25.99, description: "Price of the service" })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare price: number;

  @ApiProperty({
    example: true,
    description: "Is service currently available?",
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare is_active: boolean;

  @HasMany(() => AnalysisResult)
  analysis_results: AnalysisResult[];

  @HasMany(() => PatientService)
  patient_services: PatientService[];
}
