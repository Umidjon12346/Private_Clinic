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
import { DoctorsService } from "./doctors.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";

@ApiTags("Doctors") // Controller uchun umumiy tag
@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi shifokorni yaratish" })
  @ApiResponse({
    status: 201,
    description: "Shifokor muvaffaqiyatli yaratildi.",
  })
  @ApiResponse({ status: 400, description: "Yaratishda xato" })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha shifokorlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha shifokorlar muvaffaqiyatli qaytarildi.",
  })
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Maxsus shifokorni olish" })
  @ApiParam({ name: "id", description: "Shifokorning ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Shifokor muvaffaqiyatli qaytarildi.",
  })
  @ApiResponse({ status: 404, description: "Shifokor topilmadi" })
  findOne(@Param("id") id: string) {
    return this.doctorsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Shifokorni yangilash" })
  @ApiParam({ name: "id", description: "Shifokorning ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Shifokor muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Yangilashda xato" })
  @ApiResponse({ status: 404, description: "Shifokor topilmadi" })
  update(@Param("id") id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Shifokorni o‘chirish" })
  @ApiParam({ name: "id", description: "Shifokorning ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Shifokor muvaffaqiyatli o‘chirildi.",
  })
  @ApiResponse({ status: 404, description: "Shifokor topilmadi" })
  remove(@Param("id") id: string) {
    return this.doctorsService.remove(+id);
  }
}
