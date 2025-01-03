import { PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { PaginationInput } from 'src/common';
import { DonationType } from 'src/common/enums/donation-type.enum';

export class FilterDonationDto extends PartialType(PaginationInput) {
  @IsOptional()
  @IsEnum(DonationType)
  type?: DonationType;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  userId?: string;
}
