import { Injectable } from '@nestjs/common';
import { CreateProfileEvaluationDto } from '@app/api/profiles/modules/profile-evaluations/dto/create-profile-evaluation.dto';
import { ProfileEvaluationsRepository } from '@app/api/profiles/modules/profile-evaluations/profile-evaluations.repository';

@Injectable()
export class ProfileEvaluationsService {
  constructor(private readonly repository: ProfileEvaluationsRepository) {}

  async createRecords(dto: CreateProfileEvaluationDto) {
    const documents = [];
    for (let i = 0; i < 10; i++) {
      documents.push(dto);
    }

    const result = await this.repository.insertMany(documents);
    console.log({ result });
  }
}
