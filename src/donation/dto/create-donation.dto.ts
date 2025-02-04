import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { DonationType } from 'src/common/enums/donation-type.enum';

export class CreateDonationItemDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  quantity?: number;
}
export class CreateDonationDto {
  @IsUUID()
  @IsNotEmpty()
  eventId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEnum(DonationType)
  type: DonationType;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDonationItemDto)
  items?: CreateDonationItemDto[];
}
