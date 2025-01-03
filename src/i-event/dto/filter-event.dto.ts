import { PartialType } from '@nestjs/swagger';
import { PaginationInput } from 'src/common';

export class FilterEventDto extends PartialType(PaginationInput) {}
