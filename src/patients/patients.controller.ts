import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { PatientsService } from "./patients.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { AuthGuard } from "../common/guards/auth.guard";
import { IsAdminGuard } from "../common/guards/is.admin.guard";
import { IsPatientGuard } from "../common/guards/is.patient.guard";
import { SelfPatientGuard } from "../common/guards/patient.self.guard";

@ApiTags("Patients") // Controller uchun umumiy tag
@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi bemor yaratish" })
  @ApiResponse({ status: 201, description: "Bemor muvaffaqiyatli yaratildi." })
  @ApiResponse({ status: 400, description: "Yaratishda xato" })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha bemorlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha bemorlar muvaffaqiyatli qaytarildi.",
  })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Maxsus bemorni olish" })
  @ApiParam({ name: "id", description: "Bemorning ID raqami" })
  @ApiResponse({ status: 200, description: "Bemor muvaffaqiyatli qaytarildi." })
  @ApiResponse({ status: 404, description: "Bemor topilmadi" })
  @UseGuards(SelfPatientGuard)
  @UseGuards(IsPatientGuard)
  @UseGuards(AuthGuard)
  findOne(@Param("id") id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Bemorni yangilash" })
  @ApiParam({ name: "id", description: "Bemorning ID raqami" })
  @ApiResponse({ status: 200, description: "Bemor muvaffaqiyatli yangilandi." })
  @ApiResponse({ status: 400, description: "Yangilashda xato" })
  @ApiResponse({ status: 404, description: "Bemor topilmadi" })
  @UseGuards(SelfPatientGuard)
  @UseGuards(IsPatientGuard)
  @UseGuards(AuthGuard)
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Bemorni o‘chirish" })
  @ApiParam({ name: "id", description: "Bemorning ID raqami" })
  @ApiResponse({ status: 200, description: "Bemor muvaffaqiyatli o‘chirildi." })
  @ApiResponse({ status: 404, description: "Bemor topilmadi" })
  @UseGuards(IsAdminGuard)
  @UseGuards(AuthGuard)
  remove(@Param("id") id: string) {
    return this.patientsService.remove(+id);
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.patientsService.activateUser(link);
  }
}
