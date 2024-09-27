import { Type } from 'class-transformer';
import { Max } from 'class-validator';

export class PaginationDto {
  @Type(() => Number)
  page?: number;
  @Type(() => Number)
  @Max(100, { message: 'Limit cannot exceed 100.' })
  limit?: number;
}
