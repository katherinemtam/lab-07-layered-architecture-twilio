import Order from '../models/Order.js';
import { sendSms } from '../utils/twilio.js';

export default class OrderService {
  
  static async create({ item, quantity }) {
    const order = await Order.insert({ item, quantity });
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${item}`
    );

    return order;
  }
}

