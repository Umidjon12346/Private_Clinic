import { ApiProperty } from "@nestjs/swagger";

export class SignInDto {
  @ApiProperty({
    example: "user@example.com",
    description: "Foydalanuvchining elektron pochta manzili",
  })
  readonly email: string;

  @ApiProperty({
    example: "StrongPassword123",
    description: "Foydalanuvchining paroli",
  })
  readonly password: string;
}
