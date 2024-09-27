import { SetMetadata } from '@nestjs/common';

export const TRANSFORM_DTO = 'transform_dto';

export const TransformDto = (dto: any) => SetMetadata(TRANSFORM_DTO, dto);
