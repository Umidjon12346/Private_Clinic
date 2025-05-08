import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { SignInDto } from "../dto/sign-in.dto";
import { Response } from "express";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";
import { AuthPatientService } from "./auth-patient.service";
import { CreatePatientDto } from "../../patients/dto/create-patient.dto";

@ApiTags("Patient Authentication") // Controller uchun umumiy tag
@Controller("auth/patient")
export class AuthPatientController {
  constructor(private readonly authPatientService: AuthPatientService) {}

  @Post("sign-up")
  @ApiOperation({ summary: "Bemorni ro‘yxatdan o‘tkazish" })
  @ApiResponse({
    status: 201,
    description: "Bemor muvaffaqiyatli ro‘yxatdan o‘tdi.",
  })
  @ApiResponse({
    status: 400,
    description: "Ro‘yxatdan o‘tishda xatolik.",
  })
  async signUp(@Body() createPatientDto: CreatePatientDto) {
    return this.authPatientService.signUp(createPatientDto);
  }

  @Post("sign-in")
  @ApiOperation({ summary: "Bemor tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Bemor muvaffaqiyatli tizimga kirdi.",
  })
  @ApiResponse({
    status: 400,
    description: "Tizimga kirish uchun noto‘g‘ri ma‘lumotlar.",
  })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authPatientService.signIn(signInDto, res);
  }

  @Post("sign-out")
  @ApiOperation({ summary: "Bemor tizimdan chiqish" })
  @ApiResponse({
    status: 200,
    description: "Bemor muvaffaqiyatli tizimdan chiqdi.",
  })
  @ApiResponse({
    status: 400,
    description: "Tizimdan chiqishda xatolik.",
  })
  async signOut(
    @CookieGetter("patient_refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authPatientService.signOut(refresh_token, res);
  }

  @Post(":id/refresh")
  @ApiOperation({ summary: "Bemorning refresh token’ini yangilash" })
  @ApiParam({
    name: "id",
    description: "Bemorning ID raqami",
  })
  @ApiResponse({
    status: 200,
    description: "Bemorning refresh token muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({
    status: 400,
    description: "Token yangilanishida xatolik.",
  })
  async userRefreshToken(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("patient_refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authPatientService.staffRefreshToken(id, refresh_token, res);
  }
}
