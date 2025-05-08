import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString, IsIn } from "class-validator";

export class CreateAppointmentDto {
  @ApiProperty({
    example: 1,
    description: "Bemorning ID raqami",
  })
  patient_id: number;

  @ApiProperty({
    example: 3,
    description: "Shifokorning ID raqami",
  })
  doctor_id: number;

  @ApiProperty({
    example: "2025-05-10T14:30:00.000Z",
    description: "Uchrashuv vaqti (ISO formatda)",
  })
  @IsDateString()
  appointment_time: Date;

  @ApiPropertyOptional({
    example: "Boshsizlik va bosh ogʻriq shikoyati",
    description: "Uchrashuv sababi",
  })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({
    example: "pending",
    description: "Uchrashuv holati (masalan: pending, confirmed, cancelled)",
  })
  @IsOptional()
  @IsString()
  @IsIn(["pending", "confirmed", "cancelled"], {
    message:
      'Uchrashuv holati faqat "pending", "confirmed", yoki "cancelled" bo‘lishi mumkin',
  })
  status?: string;
}
