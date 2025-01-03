import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './entity/donation.entity';
import { IEventModule } from 'src/i-event/i-event.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Donation]), IEventModule, UserModule],
  providers: [DonationService],
  exports: [DonationService],
  controllers: [DonationController],
})
export class DonationModule {}
