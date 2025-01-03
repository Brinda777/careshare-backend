import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IEventService } from './i-event.service';
import { FilterEventDto } from './dto/filter-event.dto';
import { IEvent } from './entity/i-event.entity';
import { FindOptionsWhere } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { NotificationService } from 'src/notification/notification.service';

@Controller('event')
export class IEventController {
  constructor(
    private readonly eventService: IEventService,
    private readonly notificationService: NotificationService,
  ) {}
  @Get()
  async getEvents(@Query() filterInput?: FilterEventDto) {
    const { limit, page } = filterInput;
    const getParams: FindOptionsWhere<IEvent> = {};
    const [events, count] = await this.eventService.get(getParams, null, {
      limit,
      page,
    });
    return {
      data: events,
      meta: {
        limit: limit || 10,
        page: page || 1,
        total: count,
      },
    };
  }
  @Get(':id')
  async getEvent(@Param('id') id: string) {
    const event = await this.eventService.getOne({ id: id });
    if (!event) throw new BadRequestException('Event was not found.');
    return event;
  }
  @Post()
  async createEvent(@Body() createEventDto: CreateEventDto) {
    return await this.eventService.create(createEventDto);
  }
  @Patch(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    //? Validate
    const event = await this.getEvent(id);
    const result = await this.eventService.update(id, updateEventDto);
    if (result.affected === 1) {
      //? Notify
      const { title, description } = updateEventDto;
      await this.notificationService.create({
        event: event,
        title: title || event.title,
        description: description || event.description,
      });

      return 'Event has been updated.';
    }
    throw new BadRequestException('Event was not updated.');
  }
  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    return await this.eventService.delete(id);
  }
}
