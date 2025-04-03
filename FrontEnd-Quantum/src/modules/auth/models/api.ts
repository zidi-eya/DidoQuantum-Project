import { Expose, Transform } from 'class-transformer';

export class ApiKey {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  key: string;

  @Expose({ name: 'prompt' })
  prompt: boolean;

  @Expose({ name: 'read_collections' })
  readCollections: boolean;

  @Expose({ name: 'collection_ids' })
  collectionScope?: number[];

  @Expose({ name: 'valid_until' })
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  validUntil?: Date;

  constructor(
    id: number,
    name: string,
    key: string,
    prompt: boolean,
    readCollections: boolean,
    collectionScope: number[] | undefined,
    validUntil: Date | undefined
  ) {
    this.id = id;
    this.name = name;
    this.key = key;
    this.prompt = prompt;
    this.readCollections = readCollections;
    this.collectionScope = collectionScope;
    this.validUntil = validUntil;
  }
}
