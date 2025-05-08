import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreatePatientServiceDto {
  @ApiProperty({
    example: 1,
    description: "Bemorning ID raqami",
  })
  @IsInt()
  @Min(1)
  patient_id: number;

  @ApiProperty({
    example: 2,
    description: "Xizmat (service) ID raqami",
  })
  @IsInt()
  @Min(1)
  service_id: number;

  @ApiProperty({
    example: 3,
    description: "Shifokorning ID raqami",
  })
  @IsInt()
  @Min(1)
  doctor_id: number;

  @ApiProperty({
    example: "Bemor dori qabul qilishni boshladi",
    description: "Izohlar (optional)",
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
