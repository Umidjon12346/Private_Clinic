import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MinLength,
  Matches,
} from "class-validator";

export class CreateStaffDto {
  @ApiProperty({
    example: "John Doe",
    description: "Ishchi to‘liq ismi",
  })
  @IsString()
  full_name: string;

  @ApiProperty({
    example: "Manager",
    description: "Ishchi lavozimi",
  })
  @IsString()
  role: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Ishchi telefon raqami",
  })
  @IsPhoneNumber("UZ", {
    message: "Telefon raqam to‘g‘ri formatda bo‘lishi kerak (+998)",
  })
  phone: string;

  @ApiProperty({
    example: "staff@example.com",
    description: "Ishchi email manzili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "SecurePassword123",
    description: "Ishchi paroli (kamida 6 ta belgidan iborat bo‘lishi kerak)",
  })
  @IsString()
  @MinLength(6)
  password: string;
}
