import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { AuthStaffService } from "./auth-staff.service";
import { SignInDto } from "../dto/sign-in.dto";
import { Response } from "express";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";
import { CreateStaffDto } from "../../staffs/dto/create-staff.dto";

@ApiTags("Staff Authentication") // Controller uchun umumiy tag
@Controller("auth/staff")
export class AuthStaffController {
  constructor(private readonly authStaffService: AuthStaffService) {}

  @Post("sign-up")
  @ApiOperation({ summary: "Xodimni ro‘yxatdan o‘tkazish" })
  @ApiResponse({
    status: 201,
    description: "Xodim muvaffaqiyatli ro‘yxatdan o‘tdi.",
  })
  @ApiResponse({
    status: 400,
    description: "Ro‘yxatdan o‘tishda xatolik.",
  })
  async signUp(@Body() createStaffDto: CreateStaffDto) {
    return this.authStaffService.signUp(createStaffDto);
  }

  @Post("sign-in")
  @ApiOperation({ summary: "Xodim tizimga kirish" })
  @ApiResponse({
    status: 200,
    description: "Xodim muvaffaqiyatli tizimga kirdi.",
  })
  @ApiResponse({
    status: 400,
    description: "Tizimga kirish uchun noto‘g‘ri ma‘lumotlar.",
  })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authStaffService.signIn(signInDto, res);
  }

  @Post("sign-out")
  @ApiOperation({ summary: "Xodim tizimdan chiqish" })
  @ApiResponse({
    status: 200,
    description: "Xodim muvaffaqiyatli tizimdan chiqdi.",
  })
  @ApiResponse({
    status: 400,
    description: "Tizimdan chiqishda xatolik.",
  })
  async signOut(
    @CookieGetter("refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authStaffService.signOut(refresh_token, res);
  }

  @Post(":id/refresh")
  @ApiOperation({ summary: "Xodimning refresh token’ini yangilash" })
  @ApiParam({
    name: "id",
    description: "Xodimning ID raqami",
  })
  @ApiResponse({
    status: 200,
    description: "Xodimning refresh token muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({
    status: 400,
    description: "Token yangilanishida xatolik.",
  })
  async userRefreshToken(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authStaffService.staffRefreshToken(id, refresh_token, res);
  }
}
