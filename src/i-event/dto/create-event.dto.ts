import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DisasterType } from 'src/common/enums/disaster-type.enum';
import { ImpactLevel } from 'src/common/enums/impact-level.enum';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  image?: string;

  @IsEnum(ImpactLevel)
  impact: ImpactLevel;

  @IsEnum(DisasterType)
  disaster: DisasterType;
}
