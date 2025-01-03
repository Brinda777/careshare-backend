import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { DisasterType } from 'src/common/enums/disaster-type.enum';
import { ImpactLevel } from 'src/common/enums/impact-level.enum';

export class CreateReportDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  state?: string;

  @IsString()
  @IsNotEmpty()
  district: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  municipality?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  ward?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image?: string;

  @IsEnum(ImpactLevel)
  impact: ImpactLevel;

  @IsEnum(DisasterType)
  disaster: DisasterType;
}
