import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Doctor } from "../../doctors/models/doctor.models";

interface IDoctorScheduleCreationAttr {
  doctor_id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
}

@Table({ tableName: "doctor_schedules" })
export class DoctorSchedule extends Model<
  DoctorSchedule,
  IDoctorScheduleCreationAttr
> {
  @ApiProperty({ example: 1, description: "Unique ID of the schedule" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 1, description: "ID of the doctor" })
  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare doctor_id: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @ApiProperty({
    example: "Monday",
    description: "Day of the week",
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  })
  @Column({
    type: DataType.ENUM(
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ),
    allowNull: false,
  })
  declare day_of_week: string;

  @ApiProperty({
    example: "09:00",
    description: "Start time of working hours (24-hour format)",
  })
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  declare start_time: string;

  @ApiProperty({
    example: "17:00",
    description: "End time of working hours (24-hour format)",
  })
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  declare end_time: string;
}
