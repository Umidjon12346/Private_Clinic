import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger";
import { PatientsService } from "./patients.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";

@ApiTags("Patients") // Controller uchun umumiy tag
@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi bemor yaratish" })
  @ApiResponse({ status: 201, description: "Bemor muvaffaqiyatli yaratildi." })
  @ApiResponse({ status: 400, description: "Yaratishda xato" })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha bemorlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha bemorlar muvaffaqiyatli qaytarildi.",
  })
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Maxsus bemorni olish" })
  @ApiParam({ name: "id", description: "Bemorning ID raqami" })
  @ApiResponse({ status: 200, description: "Bemor muvaffaqiyatli qaytarildi." })
  @ApiResponse({ status: 404, description: "Bemor topilmadi" })
  findOne(@Param("id") id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Bemorni yangilash" })
  @ApiParam({ name: "id", description: "Bemorning ID raqami" })
  @ApiResponse({ status: 200, description: "Bemor muvaffaqiyatli yangilandi." })
  @ApiResponse({ status: 400, description: "Yangilashda xato" })
  @ApiResponse({ status: 404, description: "Bemor topilmadi" })
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Bemorni o‘chirish" })
  @ApiParam({ name: "id", description: "Bemorning ID raqami" })
  @ApiResponse({ status: 200, description: "Bemor muvaffaqiyatli o‘chirildi." })
  @ApiResponse({ status: 404, description: "Bemor topilmadi" })
  remove(@Param("id") id: string) {
    return this.patientsService.remove(+id);
  }
}
