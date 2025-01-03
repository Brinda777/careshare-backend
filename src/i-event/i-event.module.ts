import { Module } from '@nestjs/common';
import { IEventService } from './i-event.service';
import { IEventController } from './i-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IEvent } from './entity/i-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IEvent])],
  providers: [IEventService],
  exports: [IEventService],
  controllers: [IEventController],
})
export class IEventModule {}
