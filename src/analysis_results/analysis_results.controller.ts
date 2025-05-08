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
import { AnalysisResultsService } from "./analysis_results.service";
import { CreateAnalysisResultDto } from "./dto/create-analysis_result.dto";
import { UpdateAnalysisResultDto } from "./dto/update-analysis_result.dto";
import { AuthGuard } from "../common/guards/auth.guard";

@ApiTags("Analysis Results") // Controller uchun umumiy tag
@Controller("analysis-results")
export class AnalysisResultsController {
  constructor(
    private readonly analysisResultsService: AnalysisResultsService
  ) {}

  @Post()
  @ApiOperation({ summary: "Yangi tahlil natijasini yaratish" })
  @ApiResponse({
    status: 201,
    description: "Tahlil natijasi muvaffaqiyatli yaratildi.",
  })
  @ApiResponse({ status: 400, description: "Yaratishda xato" })
  @UseGuards(AuthGuard)
  create(@Body() createAnalysisResultDto: CreateAnalysisResultDto) {
    return this.analysisResultsService.create(createAnalysisResultDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha tahlil natijalarini olish" })
  @ApiResponse({
    status: 200,
    description: "Barcha tahlil natijalari muvaffaqiyatli qaytarildi.",
  })
  @UseGuards(AuthGuard)
  findAll() {
    return this.analysisResultsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Maxsus tahlil natijasini olish" })
  @ApiParam({ name: "id", description: "Tahlil natijasining ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Tahlil natijasi muvaffaqiyatli qaytarildi.",
  })
  @ApiResponse({ status: 404, description: "Tahlil natijasi topilmadi" })
  @UseGuards(AuthGuard)
  findOne(@Param("id") id: string) {
    return this.analysisResultsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Tahlil natijasini yangilash" })
  @ApiParam({ name: "id", description: "Tahlil natijasining ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Tahlil natijasi muvaffaqiyatli yangilandi.",
  })
  @ApiResponse({ status: 400, description: "Yangilashda xato" })
  @ApiResponse({ status: 404, description: "Tahlil natijasi topilmadi" })
  @UseGuards(AuthGuard)
  update(
    @Param("id") id: string,
    @Body() updateAnalysisResultDto: UpdateAnalysisResultDto
  ) {
    return this.analysisResultsService.update(+id, updateAnalysisResultDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Tahlil natijasini o‘chirish" })
  @ApiParam({ name: "id", description: "Tahlil natijasining ID raqami" })
  @ApiResponse({
    status: 200,
    description: "Tahlil natijasi muvaffaqiyatli o‘chirildi.",
  })
  @ApiResponse({ status: 404, description: "Tahlil natijasi topilmadi" })
  @UseGuards(AuthGuard)
  remove(@Param("id") id: string) {
    return this.analysisResultsService.remove(+id);
  }
}
