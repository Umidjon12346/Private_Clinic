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
  @IsString({ message: "To‘liq ism satr ko‘rinishida bo‘lishi kerak" })
  full_name: string;

  @ApiProperty({
    example: "2000-05-10",
    description: "Bemorning tug‘ilgan sanasi (ISO formatda)",
  })
  @IsDateString(
    {},
    { message: "Tug‘ilgan sana ISO formatda bo‘lishi kerak (YYYY-MM-DD)" }
  )
  birth_date: Date;

  @ApiProperty({
    example: "female",
    description: "Bemorning jinsi (female, male, ...)",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Jins faqat satr bo‘lishi mumkin" })
  gender?: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Bemorning telefon raqami",
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber("UZ", {
    message: "Telefon raqami +998 formatida bo‘lishi kerak",
  })
  phone?: string;

  @ApiProperty({
    example: "Toshkent sh., Chilonzor tumani",
    description: "Bemorning manzili",
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Manzil faqat satr ko‘rinishida bo‘lishi kerak" })
  address?: string;

  @ApiProperty({
    example: "aziza.rahmatova@example.com",
    description: "Bemorning email manzili",
  })
  @IsEmail({}, { message: "Email manzili noto‘g‘ri formatda kiritilgan" })
  email: string;

  @ApiProperty({
    example: "AzizaSecurePassword123",
    description: "Parol (kamida 6 ta belgidan iborat bo‘lishi kerak)",
  })
  @IsString({ message: "Parol satr ko‘rinishida bo‘lishi kerak" })
  @MinLength(6, { message: "Parol kamida 6 ta belgidan iborat bo‘lishi kerak" })
  password: string;
}
