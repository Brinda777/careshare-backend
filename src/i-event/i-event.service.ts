import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEvent } from './entity/i-event.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { PaginationInput } from 'src/common';

@Injectable()
export class IEventService {
  private logger: Logger = new Logger(IEventService.name);
  constructor(
    @InjectRepository(IEvent)
    private readonly eventRepository: Repository<IEvent>,
  ) {}
  async create(input: Partial<IEvent>) {
    try {
      const event = this.eventRepository.create(input);
      return await this.eventRepository.save(event);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
  async update(id: string, input: Partial<IEvent>) {
    try {
      return await this.eventRepository.update(id, input);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
  async get(
    whereParams?: FindOptionsWhere<IEvent>,
    orderParams?: FindOptionsOrder<IEvent>,
    paginationInput?: PaginationInput,
  ) {
    return await this.eventRepository.findAndCount({
      where: whereParams || {},
      order: orderParams || { createdAt: 'DESC' },
      take: paginationInput?.limit || 10,
      skip: ((paginationInput?.page || 1) - 1) * (paginationInput?.limit || 10),
    });
  }
  async getOne(whereParams?: FindOptionsWhere<IEvent>) {
    return await this.eventRepository.findOne({ where: whereParams || {} });
  }
  async delete(id: string) {
    const result = await this.eventRepository.delete(id);
    if (result.affected == 1) {
      return 'Event has been deleted.';
    }
    throw new BadRequestException('Event was not deleted.');
  }
}
