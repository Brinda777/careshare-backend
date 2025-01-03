import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Donation } from './entity/donation.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { PaginationInput } from 'src/common';

@Injectable()
export class DonationService {
  private logger: Logger = new Logger(DonationService.name);
  constructor(
    @InjectRepository(Donation)
    private readonly donationRepository: Repository<Donation>,
  ) {}
  async create(input: Partial<Donation>) {
    try {
      const donation = this.donationRepository.create(input);
      return await this.donationRepository.save(donation);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
  async update(id: string, input: Partial<Donation>) {
    try {
      return await this.donationRepository.update(id, input);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
  async get(
    whereParams?: FindOptionsWhere<Donation>,
    orderParams?: FindOptionsOrder<Donation>,
    paginationInput?: PaginationInput,
  ) {
    return await this.donationRepository.findAndCount({
      where: whereParams || {},
      order: orderParams || { createdAt: 'DESC' },
      take: paginationInput?.limit || 10,
      skip: ((paginationInput?.page || 1) - 1) * (paginationInput?.limit || 10),
      relations: ['user', 'event'],
    });
  }
  async getOne(whereParams?: FindOptionsWhere<Donation>) {
    return await this.donationRepository.findOne({
      where: whereParams || {},
      relations: ['user', 'event'],
    });
  }
  async delete(id: string) {
    const result = await this.donationRepository.delete(id);
    if (result.affected == 1) {
      return 'Donation has been deleted.';
    }
    throw new BadRequestException('Donation was not deleted.');
  }
}
