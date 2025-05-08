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
import { StaffsService } from "./staffs.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";

@ApiTags("Staffs") // Controller uchun umumiy tag
@Controller("staffs")
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  @ApiOperation({ summary: "Yangi xodim yaratish" })
  @ApiResponse({ status: 201, description: "Xodim muvaffaqiyatli yaratildi." })
  @ApiResponse({ status: 400, description: "Xodim yaratishda xato" })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha xodimlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha xodimlar muvaffaqiyatli qaytarildi.",
  })
  findAll() {
    return this.staffsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Maxsus xodimni olish" })
  @ApiParam({ name: "id", description: "Xodimning ID raqami" })
  @ApiResponse({ status: 200, description: "Xodim muvaffaqiyatli qaytarildi." })
  @ApiResponse({ status: 404, description: "Xodim topilmadi" })
  findOne(@Param("id") id: string) {
    return this.staffsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Xodimni yangilash" })
  @ApiParam({ name: "id", description: "Xodimning ID raqami" })
  @ApiResponse({ status: 200, description: "Xodim muvaffaqiyatli yangilandi." })
  @ApiResponse({ status: 400, description: "Yangilashda xato" })
  @ApiResponse({ status: 404, description: "Xodim topilmadi" })
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(+id, updateStaffDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xodimni o‘chirish" })
  @ApiParam({ name: "id", description: "Xodimning ID raqami" })
  @ApiResponse({ status: 200, description: "Xodim muvaffaqiyatli o‘chirildi." })
  @ApiResponse({ status: 404, description: "Xodim topilmadi" })
  remove(@Param("id") id: string) {
    return this.staffsService.remove(+id);
  }
}
