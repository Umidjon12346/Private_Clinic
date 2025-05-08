import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsDateString,
  MinLength,
} from "class-validator";

export class CreatePatientDto {
  @ApiProperty({
    example: "Aziza Rahmatova",
    description: "Bemorning to‘liq ismi",
  })
  @IsString()
  full_name: string;

  @ApiProperty({
    example: "2000-05-10",
    description: "Bemorning tug‘ilgan sanasi (ISO formatda)",
  })
  @IsDateString()
  birth_date: Date;

  @ApiProperty({
    example: "female",
    description: "Bemorning jinsi (female, male, ...)",
    required: false,
  })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Bemorning telefon raqami",
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber("UZ")
  phone?: string;

  @ApiProperty({
    example: "Toshkent sh., Chilonzor tumani",
    description: "Bemorning manzili",
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: "aziza.rahmatova@example.com",
    description: "Bemorning email manzili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "AzizaSecurePassword123",
    description: "Parol (kamida 6 ta belgidan iborat bo‘lishi kerak)",
  })
  @IsString()
  @MinLength(6)
  password: string;
}
