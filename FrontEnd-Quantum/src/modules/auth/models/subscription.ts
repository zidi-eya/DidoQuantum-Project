import { Expose, Transform } from 'class-transformer';


enum SubscriptionStatus {
  TRIAL = 0,
  ACTIVE = 1,
  PAUSED = 3,
  UNPAID = 4,
  CANCELLED = 5
}

export class Subscription {
  @Expose({ name: "validity_date" })
  validity_date: Date;
  @Expose({name: "plan"}

  ) plan: string;
  @Expose({name: "provider"})
  provider: number

  @Expose ({name: "status"})
  status: SubscriptionStatus
}
