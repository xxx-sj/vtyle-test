import { Body, Controller, Post } from '@nestjs/common';
import { ProfileEvaluationsService } from '@app/api/profiles/modules/profile-evaluations/profile-evaluations.service';
import { CreateProfileEvaluationDto } from '@app/api/profiles/modules/profile-evaluations/dto/create-profile-evaluation.dto';

@Controller('profile-evaluations')
export class ProfileEvaluationsController {
  constructor(private readonly service: ProfileEvaluationsService) {}

  @Post()
  async create(@Body() dto: CreateProfileEvaluationDto) {
    //TODO
    return this.service.createRecords(dto);
  }
}
