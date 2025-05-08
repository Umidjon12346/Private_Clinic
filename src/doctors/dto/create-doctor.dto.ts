import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from "class-validator";

export class CreateDoctorDto {
  @ApiProperty({
    example: "Dr. Nodira Karimova",
    description: "Shifokorning to‘liq ismi",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: "Kardiolog",
    description: "Shifokorning mutaxassisligi",
  })
  @IsString()
  @IsNotEmpty()
  specialization: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Shifokorning telefon raqami",
  })
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message:
      "Telefon raqam +998 bilan boshlanishi va 9 raqamdan iborat bo‘lishi kerak",
  })
  phone: string;

  @ApiProperty({ example: "doctor@example.com", description: "Email manzili" })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "StrongPass123",
    description: "Parol (kamida 6 ta belgidan iborat bo‘lishi kerak)",
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "Terapiya", description: "Bo‘lim nomi" })
  @IsString()
  @IsNotEmpty()
  department: string;
}
