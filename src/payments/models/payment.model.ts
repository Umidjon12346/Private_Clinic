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
import { Appointment } from "../../appointments/models/appointment.model";
import { PatientService } from "../../patient_services/models/patient_service.model";

interface IPaymentCreationAttr {
  patient_id: number;
  appointment_id?: number;
  patient_services_id?: number;
  amount: number;
  payment_method: string;
  status?: string;
}

@Table({ tableName: "payments" })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @ApiProperty({ example: 1, description: "Unique payment ID" })
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

  @ApiProperty({ example: 1, description: "Appointment ID (optional)" })
  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare appointment_id: number;

  @BelongsTo(() => Appointment)
  appointment: Appointment;

  @ApiProperty({ example: 1, description: "Patient service ID (optional)" })
  @ForeignKey(() => PatientService)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare patient_services_id: number;

  @BelongsTo(() => PatientService)
  patient_service: PatientService;

  @ApiProperty({ example: 99.99, description: "Payment amount" })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare amount: number;

  @ApiProperty({
    example: "credit_card",
    description: "Payment method",
    enum: ["credit_card", "cash", "insurance", "bank_transfer"],
  })
  @Column({
    type: DataType.ENUM("credit_card", "cash", "insurance", "bank_transfer"),
    allowNull: false,
  })
  declare payment_method: string;

  @ApiProperty({ example: "2023-06-15", description: "Payment date" })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  declare payment_date: Date;

  @ApiProperty({
    example: "completed",
    description: "Payment status",
    enum: ["pending", "completed", "failed", "refunded"],
  })
  @Column({
    type: DataType.ENUM("pending", "completed", "failed", "refunded"),
    defaultValue: "pending",
  })
  declare status: string;
}
