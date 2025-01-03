import { PartialType } from '@nestjs/swagger';
import { PaginationInput } from 'src/common';

export class FilterNotificationDto extends PartialType(PaginationInput) {}
