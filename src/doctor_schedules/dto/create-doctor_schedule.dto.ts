import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  IsInt,
  Min,
} from "class-validator";

export enum WeekDays {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export class CreateDoctorScheduleDto {
  @ApiProperty({
    example: 3,
    description: "Shifokorning ID raqami",
  })
  @IsInt()
  @Min(1)
  doctor_id: number;

  @ApiProperty({
    example: "Monday",
    description: "Hafta kuni (Monday - Sunday)",
    enum: WeekDays,
  })
  @IsEnum(WeekDays)
  day_of_week: WeekDays;

  @ApiProperty({
    example: "09:00",
    description: "Boshlanish vaqti (HH:mm formatda)",
  })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "start_time must be in HH:mm format",
  })
  start_time: string;

  @ApiProperty({
    example: "17:00",
    description: "Tugash vaqti (HH:mm formatda)",
  })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "end_time must be in HH:mm format",
  })
  end_time: string;
}
