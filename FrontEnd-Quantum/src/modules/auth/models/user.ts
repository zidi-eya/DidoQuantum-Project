import { Expose, Transform } from 'class-transformer';
import { Role } from '@/modules/auth/utils/constants';
import { Subscription} from 'src/modules/auth/models/subscription';

export class User {
  @Expose()
  id: number;

  @Expose({ name: 'full_name' })
  fullName: string;

  @Expose()
  email: string;

  @Expose({ name: 'is_active' })
  isActive: boolean;

  @Expose()
  @Transform(({ value }) => value.map((role: string) => role as Role))
  roles: Role[];

  @Expose({ name: 'subscription_status' })
  subscription: Subscription


  constructor(
    id: number,
    fullName: string,
    email: string,
    isActive: boolean,
    roles: Role[],
    subscription: Subscription,

  ) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.isActive = isActive;
    this.roles = roles;
    this.subscription = subscription;

  }
}
