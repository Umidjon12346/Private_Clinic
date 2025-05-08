import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateServiceDto {
  @ApiProperty({
    example: "Xizmat nomi",
    description: "Xizmatning nomi",
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    example: "Xizmat haqida qisqacha tavsif",
    description: "Xizmatning tavsifi",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 5000,
    description: "Xizmat narxi",
  })
  @IsInt()
  @Min(0)
  price: number;

  @ApiProperty({
    example: true,
    description: "Xizmat faolligi",
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
