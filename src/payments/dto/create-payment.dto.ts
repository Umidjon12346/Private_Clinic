import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Min, IsIn } from "class-validator";

export class CreatePaymentDto {
  @ApiProperty({
    example: 1,
    description: "Bemorning ID raqami",
  })
  @IsInt()
  @Min(1)
  patient_id: number;

  @ApiProperty({
    example: 3,
    description: "Tayinlangan uchrashuv (appointment) ID raqami",
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  appointment_id?: number;

  @ApiProperty({
    example: 5,
    description: "Bemorning xizmat (patient_service) ID raqami",
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  patient_services_id?: number;

  @ApiProperty({
    example: 200,
    description: "To‘lov miqdori (summasi)",
  })
  @IsInt()
  @Min(0)
  amount: number;

  @ApiProperty({
    example: "Click",
    description: "To‘lov usuli (masalan: Cash, Click, ...)",
  })
  @IsString()
  @IsIn(["Cash", "Click", "CreditCard"], {
    message:
      'To‘lov usuli faqat "Cash", "Click" yoki "CreditCard" bo‘lishi mumkin',
  })
  payment_method: string;

  @ApiProperty({
    example: "Completed",
    description: "To‘lov holati (Completed, Pending, Failed)",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(["Completed", "Pending", "Failed"], {
    message:
      'Status faqat "Completed", "Pending", yoki "Failed" bo‘lishi mumkin',
  })
  status?: string;
}
