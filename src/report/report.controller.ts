import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { PaginationInput } from 'src/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createReport(
    @Body() createReportDto: CreateReportDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.reportService.create({
      user: {
        id: createReportDto.userId,
      },
      ...createReportDto,
    });
  }

  @Get()
  async getReports(@Query() paginationInput?: PaginationInput) {
    const [reports, count] = await this.reportService.get(
      null,
      null,
      paginationInput,
    );
    return {
      data: reports,
      meta: {
        limit: paginationInput?.limit || 10,
        page: paginationInput?.page || 1,
        total: count,
      },
    };
  }
}
