import { Expose } from 'class-transformer';

export enum Recurrence {
    MONTH = 0,
    YEAR = 1
}

export class Product {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    logo: string;

    @Expose()
    features: string[];

    @Expose()

    prices : Price[];

    constructor(id: string, name: string, description: string, logo: string, features: string[], prices: Price[]) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.logo = logo;
      this.features = features;
      this.prices = prices;
    }

    public getPrice(recurrence: Recurrence) : Price{
      return this.prices.filter((price) => price.recurrence == recurrence)[0];
    }

}

export class Price {
    @Expose()
    id: string;

    @Expose()
    recurrence: Recurrence;

    @Expose()
    price: number;

    @Expose()
    currency: string;

    constructor(id: string, recurrence: Recurrence, price: number, currency: string) {
        this.id = id;
        this.recurrence = recurrence;
        this.price = price;
        this.currency = currency;
    }
}
