import { Injectable, Query } from '@nestjs/common';
import { ProfilesRepository } from '@app/api/profiles/profiles.repository';
import { PaginationDto } from '@app/common/dto/Pagination.dto';
import { ProfileEvaluationsRepository } from '@app/api/profiles/modules/profile-evaluations/profile-evaluations.repository';
import { LookupReferences } from '@app/utils/mongoose/lookup-references';
import { User } from '@app/api/users/schemas';
import { Types } from 'mongoose';
import { CreateProfileDto } from '@app/api/profiles/dto/create-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly profileRepository: ProfilesRepository,
    private readonly profileEvaluationRepository: ProfileEvaluationsRepository,
  ) {}

  async getRaters(paginationDto: PaginationDto, userId: string) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter = { userId: new Types.ObjectId(userId), rating: 5 };
    const options = { skip: skip, limit: limit, sort: { evaluatedAt: -1 } };
    const foreignKey = 'evaluatorId';
    const reference = 'evaluator';
    const lookup = new LookupReferences(`${User.name}s`, foreignKey, reference);
    const result = await this.profileEvaluationRepository.aggregateWithLookup(filter, options, lookup);
    return result.map((doc) => {
      return { isUnlocked: doc.isUnlocked, ...doc[reference] };
    });
  }

  async getRatedUsers(paginationDto: PaginationDto, userId: string) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter = { evaluatorId: new Types.ObjectId(userId), rating: 5 };
    const options = { skip: skip, limit: limit, sort: { evaluatedAt: -1 } };
    const foreignKey = 'userId';
    const reference = 'user';

    const lookup = new LookupReferences(`${User.name}s`, foreignKey, reference);

    return (await this.profileEvaluationRepository.aggregateWithLookup(filter, options, lookup)).map(
      (doc) => doc[reference],
    );
  }

  async getGoldCardAchievers(paginationDto: PaginationDto) {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const filter = { status: 'approved', rating: 5 };
    const options = { skip, limit, sort: { evaluationCompletedAt: -1 } };
    const foreignKey = 'userId';
    const reference = 'user';

    const lookup = new LookupReferences(`${User.name}s`, foreignKey, reference);

    return await this.profileRepository.aggregateWithLookup(filter, options, lookup, true);
  }

  async create(dto: CreateProfileDto) {
    await this.profileRepository.create(dto);
  }
}
