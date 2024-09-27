import { AbstractSchema } from '@app/utils/mongoose/abstract.schema';
import { Logger } from '@nestjs/common';
import {
  Expression,
  FilterQuery,
  InsertManyOptions,
  Model,
  PipelineStage,
  QueryOptions,
  SaveOptions,
  Types,
} from 'mongoose';
import { LookupReferences } from '@app/utils/mongoose/lookup-references';

export abstract class AbstractRepository<TDocument extends AbstractSchema> {
  protected abstract readonly logger: Logger;

  private readonly DEFAULT_OPTION = {
    sort: { _id: 1 },
    skip: 0,
    limit: 10,
  };
  protected constructor(protected readonly model: Model<TDocument>) {}

  async find(filter: FilterQuery<TDocument>, options?: QueryOptions<TDocument>) {
    return await this.model.find(filter, {}, { lean: true, ...options }).exec();
  }
  async findWithReferences(
    filter: FilterQuery<TDocument>,
    options?: QueryOptions<TDocument>,
    populateFields?: string[],
  ) {
    let query = this.model.find(filter, {}, { ...options, lean: true });
    if (Array.isArray(populateFields) && populateFields.length > 0) {
      query = query.populate(populateFields);
    }

    return await query.exec();
  }

  async aggregate(filter: FilterQuery<TDocument>, options?: QueryOptions<TDocument>) {
    const queryOptions = { ...this.DEFAULT_OPTION, ...options };

    const pipeline: PipelineStage[] = [
      { $match: filter },
      { $sort: queryOptions.sort || { _id: 1 } },
      { $skip: queryOptions.skip || 0 },
      { $limit: queryOptions.limit || 10 },
    ];

    return await this.model.aggregate(pipeline).exec();
  }

  async aggregateWithLookup(
    filter: FilterQuery<TDocument>,
    options?: QueryOptions<TDocument>,
    lookup?: LookupReferences,
    useFlatResult?: boolean,
  ) {
    const queryOptions = { ...this.DEFAULT_OPTION, ...options };

    const pipeline: PipelineStage[] = [
      { $match: filter },
      { $sort: queryOptions.sort || { _id: 1 } },
      { $skip: queryOptions.skip || 0 },
      { $limit: queryOptions.limit || 10 },
    ];

    if (lookup) {
      pipeline.push({
        $lookup: {
          from: lookup.from.toLowerCase(),
          localField: lookup.localField,
          foreignField: lookup.foreignField,
          as: lookup.as,
        },
      });
    }

    pipeline.push({
      $unwind: `$${lookup.as}`,
    });

    if (useFlatResult) {
      pipeline.push({
        $replaceRoot: { newRoot: { $mergeObjects: [`$${lookup.as}`, '$$ROOT'] } },
      });
    }

    return await this.model.aggregate(pipeline).exec();
  }

  async create(document: Partial<TDocument>, options?: SaveOptions) {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return await createdDocument.save(options);
  }

  async insertMany(documents: Partial<TDocument>[], options?: InsertManyOptions) {
    const documentsWithId = documents.map((doc) => ({
      ...doc,
      _id: new Types.ObjectId(),
    }));

    return await this.model.insertMany(documentsWithId, { rawResult: false, ...options });
  }
}
