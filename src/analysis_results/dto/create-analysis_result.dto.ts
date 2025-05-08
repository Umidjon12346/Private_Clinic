import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumberString,
} from "class-validator";

export class CreateAnalysisResultDto {
  @ApiProperty({
    example: 12,
    description: "Tibbiy yozuv (medical record) ID raqami",
  })
  @IsNumberString()
  medical_id: number;

  @ApiProperty({
    example: 5,
    description: "Tibbiy xizmat (analiz) ID raqami",
  })
  @IsNumberString()
  service_id: number;

  @ApiProperty({
    example: "Hemoglobin",
    description: "Tahlil natijasining nomi",
  })
  @IsString()
  @IsNotEmpty()
  result: string;

  @ApiProperty({
    example: "13.5",
    description: "Tahlil natijasining qiymati",
  })
  @IsString()
  @IsNotEmpty()
  result_value: string;

  @ApiProperty({
    example: "12.0 - 16.0",
    description: "Me'yoriy oraliq",
  })
  @IsString()
  @IsNotEmpty()
  normal_range: string;

  @ApiProperty({
    example: "2025-05-07T10:00:00.000Z",
    description: "Tahlil olingan sana (ISO formatda)",
  })
  @IsDateString()
  result_date: Date;

  @ApiProperty({
    example: "/uploads/analysis/hemoglobin_result.pdf",
    description: "Natijaning fayl yo‘li (serverdagi saqlanish joyi)",
  })
  @IsString()
  @IsNotEmpty()
  file_path: string;
}
