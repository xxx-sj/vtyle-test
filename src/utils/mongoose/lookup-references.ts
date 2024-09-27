export class LookupReferences {
  constructor(from: string, localField: string, as: string, foreignField: string = '_id') {
    this.from = from;
    this.localField = localField;
    this.as = as;
    this.foreignField = foreignField;
  }

  from: string;
  localField: string;
  foreignField: string;
  as: string;
}
