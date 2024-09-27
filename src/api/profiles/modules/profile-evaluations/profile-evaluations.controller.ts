import { Body, Controller, Post } from '@nestjs/common';
import { ProfileEvaluationsService } from '@app/api/profiles/modules/profile-evaluations/profile-evaluations.service';
import { CreateProfileEvaluationDto } from '@app/api/profiles/modules/profile-evaluations/dto/create-profile-evaluation.dto';
import { Types } from 'mongoose';

@Controller('profile-evaluations')
export class ProfileEvaluationsController {
  constructor(private readonly service: ProfileEvaluationsService) {}

  @Post()
  async create(@Body() dto: CreateProfileEvaluationDto) {
    //TODO
    dto.userId = new Types.ObjectId().toString();
    dto.profileId = new Types.ObjectId().toString();
    return this.service.createRecords(dto);
  }
}
