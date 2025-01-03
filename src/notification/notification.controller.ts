import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { FilterNotificationDto } from './dto/filter-notification.dto';
import { FindOptionsWhere } from 'typeorm';
import { INotification } from './entity/notification.entity';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}
  @Get()
  async getNotifications(@Query() filterInput?: FilterNotificationDto) {
    const { limit, page } = filterInput;
    const getParams: FindOptionsWhere<INotification> = {};
    const [notifications, count] = await this.notificationService.get(
      getParams,
      null,
      {
        limit,
        page,
      },
    );
    return {
      data: notifications,
      meta: {
        limit: limit || 10,
        page: page || 1,
        total: count,
      },
    };
  }
  @Get(':id')
  async getNotification(@Param('id') id: string) {
    const notification = await this.notificationService.getOne({ id: id });
    if (!notification)
      throw new BadRequestException('Notification was not found.');
    return notification;
  }
}
