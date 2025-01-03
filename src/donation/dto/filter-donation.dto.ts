import { PartialType } from '@nestjs/swagger';
import { PaginationInput } from 'src/common';

export class FilterDonationDto extends PartialType(PaginationInput) {}
