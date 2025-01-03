import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { INotification } from './entity/notification.entity';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { PaginationInput } from 'src/common';

@Injectable()
export class NotificationService {
  private logger: Logger = new Logger(NotificationService.name);
  constructor(
    @InjectRepository(INotification)
    private readonly notificationRepository: Repository<INotification>,
  ) {}
  async create(input: Partial<INotification>) {
    try {
      const notification = this.notificationRepository.create(input);
      return await this.notificationRepository.save(notification);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
  async update(id: string, input: Partial<INotification>) {
    try {
      return await this.notificationRepository.update(id, input);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException(error);
    }
  }
  async get(
    whereParams?: FindOptionsWhere<INotification>,
    orderParams?: FindOptionsOrder<INotification>,
    paginationInput?: PaginationInput,
  ) {
    return await this.notificationRepository.findAndCount({
      where: whereParams || {},
      order: orderParams || { createdAt: 'DESC' },
      take: paginationInput?.limit || 10,
      skip: ((paginationInput?.page || 1) - 1) * (paginationInput?.limit || 10),
      relations: ['event'],
    });
  }
  async getOne(whereParams?: FindOptionsWhere<INotification>) {
    return await this.notificationRepository.findOne({
      where: whereParams || {},
      relations: ['event'],
    });
  }
  async delete(id: string) {
    const result = await this.notificationRepository.delete(id);
    if (result.affected == 1) {
      return 'Notification has been deleted.';
    }
    throw new BadRequestException('Notification was not deleted.');
  }
}
