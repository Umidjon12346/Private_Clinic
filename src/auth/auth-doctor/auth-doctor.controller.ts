import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { AuthDoctorService } from "./auth-doctor.service";
import { SignInDto } from "../dto/sign-in.dto";
import { Response } from "express";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";

@ApiTags("Doctor Authentication") // Controller uchun umumiy tag
@Controller("auth/doctor")
export class AuthDoctorController {
  constructor(private readonly authDoctorService: AuthDoctorService) {}

  @Post("sign-in")
  @ApiOperation({ summary: "Shifokor tizimiga kirish" })
  @ApiResponse({
    status: 200,
    description: "Shifokor muvaffaqiyatli tizimga kirdi.",
  })
  @ApiResponse({
    status: 400,
    description: "Tizimga kirish uchun noto‘g‘ri ma‘lumotlar.",
  })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authDoctorService.signIn(signInDto, res);
  }

  @Post("sign-out")
  @ApiOperation({ summary: "Shifokor tizimdan chiqish" })
  @ApiResponse({
    status: 200,
    description: "Shifokor muvaffaqiyatli tizimdan chiqdi.",
  })
  @ApiResponse({
    status: 400,
    description: "Tizimdan chiqishda xatolik.",
  })
  async signOut(
    @CookieGetter("doctor_refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authDoctorService.signOut(refresh_token, res);
  }

  @Post(":id/refresh")
  @ApiOperation({ summary: "Shifokorning refresh token’ini yangilash" })
  @ApiParam({
    name: "id",
    description: "Shifokorning ID raqami",
  })
  @ApiResponse({
    status: 200,
    description: "Shifokorning refresh token muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({
    status: 400,
    description: "Token yangilanishida xatolik.",
  })
  async userRefreshToken(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("doctor_refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authDoctorService.doctorRefreshToken(id, refresh_token, res);
  }
}
