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
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";

@ApiTags("Services") // Controller uchun umumiy tag
@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @ApiOperation({ summary: "Yangi xizmat yaratish" })
  @ApiResponse({ status: 201, description: "Xizmat muvaffaqiyatli yaratildi." })
  @ApiResponse({ status: 400, description: "Xizmat yaratishda xato" })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha xizmatlarni olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha xizmatlar muvaffaqiyatli qaytarildi.",
  })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Maxsus xizmatni olish" })
  @ApiParam({ name: "id", description: "Xizmatning ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Xizmat muvaffaqiyatli qaytarildi.",
  })
  @ApiResponse({ status: 404, description: "Xizmat topilmadi" })
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Xizmatni yangilash" })
  @ApiParam({ name: "id", description: "Xizmatning ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Xizmat muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Yangilashda xato" })
  @ApiResponse({ status: 404, description: "Xizmat topilmadi" })
  update(@Param("id") id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Xizmatni o‘chirish" })
  @ApiParam({ name: "id", description: "Xizmatning ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Xizmat muvaffaqiyatli o‘chirildi.",
  })
  @ApiResponse({ status: 404, description: "Xizmat topilmadi" })
  remove(@Param("id") id: string) {
    return this.servicesService.remove(+id);
  }
}
