import { Module } from '@nestjs/common';
import { IEventService } from './i-event.service';
import { IEventController } from './i-event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IEvent } from './entity/i-event.entity';
import { NotificationModule } from 'src/notification/notification.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([IEvent]),
    NotificationModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  ],
  providers: [IEventService],
  exports: [IEventService],
  controllers: [IEventController],
})
export class IEventModule {}
