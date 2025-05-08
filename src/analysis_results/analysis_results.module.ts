import { Module } from '@nestjs/common';
import { AnalysisResultsService } from './analysis_results.service';
import { AnalysisResultsController } from './analysis_results.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnalysisResult } from './models/analysis_result.model';

@Module({
  imports:[SequelizeModule.forFeature([AnalysisResult])],
  controllers: [AnalysisResultsController],
  providers: [AnalysisResultsService],
})
export class AnalysisResultsModule {}
