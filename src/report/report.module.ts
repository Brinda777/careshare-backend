import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IReport } from './entity/report.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([IReport]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  providers: [ReportService],
  exports: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
