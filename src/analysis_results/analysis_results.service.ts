import { Injectable } from '@nestjs/common';
import { CreateAnalysisResultDto } from './dto/create-analysis_result.dto';
import { UpdateAnalysisResultDto } from './dto/update-analysis_result.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AnalysisResult } from './models/analysis_result.model';

@Injectable()
export class AnalysisResultsService {
  constructor(
    @InjectModel(AnalysisResult)
    private readonly analysisResultModel: typeof AnalysisResult
  ) {}

  create(createAnalysisResultDto: CreateAnalysisResultDto) {
    return this.analysisResultModel.create(createAnalysisResultDto);
  }

  findAll() {
    return this.analysisResultModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.analysisResultModel.findByPk(id, { include: { all: true } });
  }

  async update(id: number, updateAnalysisResultDto: UpdateAnalysisResultDto) {
    const [count, updated] = await this.analysisResultModel.update(
      updateAnalysisResultDto,
      {
        where: { id },
        returning: true,
      }
    );
    return count > 0 ? updated[0] : null;
  }

  async remove(id: number) {
    const deleted = await this.analysisResultModel.destroy({ where: { id } });
    if (deleted > 0) {
      return "ochib olib kettii";
    }
    return "ochirmaaaa";
  }
}
