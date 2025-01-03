import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationInput } from 'src/common';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { IReport } from './entity/report.entity';

@Injectable()
export class ReportService {
  private logger: Logger = new Logger(ReportService.name);
  constructor(
    @InjectRepository(IReport)
    private readonly reportRepository: Repository<IReport>,
  ) {}
  async create(input: Partial<IReport>) {
    try {
      const report = this.reportRepository.create(input);
      return await this.reportRepository.save(report);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
  async update(id: string, input: Partial<IReport>) {
    try {
      return await this.reportRepository.update(id, input);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
  async get(
    whereParams?: FindOptionsWhere<IReport>,
    orderParams?: FindOptionsOrder<IReport>,
    paginationInput?: PaginationInput,
  ) {
    return await this.reportRepository.findAndCount({
      where: whereParams || {},
      order: orderParams || { createdAt: 'DESC' },
      take: paginationInput?.limit || 10,
      skip: ((paginationInput?.page || 1) - 1) * (paginationInput?.limit || 10),
      relations: ['user'],
    });
  }
  async getOne(whereParams?: FindOptionsWhere<IReport>) {
    return await this.reportRepository.findOne({
      where: whereParams || {},
      relations: ['user'],
    });
  }
  async delete(id: string) {
    const result = await this.reportRepository.delete(id);
    if (result.affected == 1) {
      return 'Report has been deleted.';
    }
    throw new BadRequestException('Report was not deleted.');
  }
}
