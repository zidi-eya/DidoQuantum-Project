import { Expose, Transform } from 'class-transformer';

export class ApiKey {
  @Expose()
  id: number;

 //@Expose()
 // name: string;

  @Expose()
  key: string;

  @Expose({ name: 'prompt' })
  prompt: boolean;

  @Expose({ name: 'valid_until' })
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  validUntil?: Date;

  constructor(
    id: number,
    //name: string,
    key: string,
    prompt: boolean,
    validUntil: Date | undefined
  ) {
    this.id = id;
    //this.name = name;
    this.key = key;
    this.prompt = prompt;
    this.validUntil = validUntil;
  }
}
