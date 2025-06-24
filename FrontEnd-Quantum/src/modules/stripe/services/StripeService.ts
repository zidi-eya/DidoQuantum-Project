import { api } from 'src/boot/axios';
import { Product } from 'src/modules/stripe/models/price';
import { plainToInstance } from 'class-transformer';

class STRIPEService {
  async getAllPrices(): Promise<Product[]> {
    const response = await api.get('api/stripe/prices');
    const data = response.data;
    return plainToInstance(Product, data, {
      excludeExtraneousValues: true,
    });
  }

  async createCheckoutSession(priceId: string): Promise<string> {
    const response = await api.post('api/stripe/checkout-session', { price_id: priceId });
    return response.data.url;
  }

  async getSubscription(user: any): Promise<string> {
    const response = await api.get('api/stripe/subscription');
    return response.data.url;
  }
}

const stripeService = new STRIPEService();

export default stripeService;
