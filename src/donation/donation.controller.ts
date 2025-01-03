import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DonationService } from './donation.service';
import { FilterDonationDto } from './dto/filter-donation.dto';
import { FindOptionsWhere } from 'typeorm';
import { Donation } from './entity/donation.entity';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { UserService } from 'src/user/user.service';
import { IEventService } from 'src/i-event/i-event.service';
import { DonationType } from 'src/common/enums/donation-type.enum';

@Controller('donation')
export class DonationController {
  constructor(
    private readonly donationService: DonationService,
    private readonly userService: UserService,
    private readonly eventService: IEventService,
  ) {}
  @Get()
  async getDonations(@Query() filterInput?: FilterDonationDto) {
    const { limit, page, type, userId } = filterInput;
    const getParams: FindOptionsWhere<Donation> = {};
    if (type) {
      getParams.type = type;
    }
    if (userId) {
      getParams.user = { id: userId };
    }
    const [donations, count] = await this.donationService.get(getParams, null, {
      limit,
      page,
    });
    return {
      data: donations,
      meta: {
        limit: limit || 10,
        page: page || 1,
        total: count,
      },
    };
  }
  @Get(':id')
  async getDonation(@Param('id') id: string) {
    const donation = await this.donationService.getOne({ id: id });
    if (!donation) throw new BadRequestException('Donation was not found.');
    return donation;
  }
  @Post()
  async createDonation(@Body() createDonationDto: CreateDonationDto) {
    const { eventId, userId, type, amount, items } = createDonationDto;
    const event = await this.eventService.getOne({ id: eventId });
    if (!event) throw new NotFoundException('Event was not found.');

    const user = await this.userService.getOne({ id: userId });
    if (!user) throw new NotFoundException('User was not found.');

    const donation = await this.donationService.create({
      event: event,
      user: user,
      type: type,
      amount: amount,
      items: items,
    });

    //? Update Attendees
    if (type === DonationType.VOLUNTEER) {
      await this.eventService.update(event.id, {
        attendees: Number(event.attendees + 1),
      });
    }
    return donation;
  }
  @Patch(':id')
  async updateDonation(
    @Param('id') id: string,
    @Body() updateDonationDto: UpdateDonationDto,
  ) {
    const result = await this.donationService.update(id, updateDonationDto);
    if (result.affected === 1) return 'Donation has been updated.';
    throw new BadRequestException('Donation was not updated.');
  }
  @Delete(':id')
  async deleteDonation(@Param('id') id: string) {
    return await this.donationService.delete(id);
  }
}
