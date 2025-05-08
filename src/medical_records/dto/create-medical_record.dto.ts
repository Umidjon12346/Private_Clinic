import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateMedicalRecordDto {
  @ApiProperty({
    example: 1,
    description: "Bemorning ID raqami",
  })
  @IsInt()
  @Min(1)
  patient_id: number;

  @ApiProperty({
    example: 3,
    description: "Shifokorning ID raqami",
  })
  @IsInt()
  @Min(1)
  doctor_id: number;

  @ApiProperty({
    example: "Gipertoniya bosqich 2",
    description: "Tashxis (diagnosis)",
  })
  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @ApiProperty({
    example: "Kuniga 2 mahal dori qabul qilish, parhezga rioya qilish",
    description: "Davolash (treatment)",
  })
  @IsString()
  @IsNotEmpty()
  treatment: string;
}
