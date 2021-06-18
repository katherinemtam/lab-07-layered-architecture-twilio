import Order from '../models/Order.js';
import { sendSms } from '../utils/twilio.js';

export default class OrderService {

  static async create({ item, quantity }) {
    const order = await Order.insert({ item, quantity });
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Thank you for your purchase!
      New Order received for ${item}.`
    );

    return order;
  }

  static async update({ item, quantity }) {
    const order = await Order.update({ item, quantity });
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Looks like you adjusted something!
      Update received for ${item}.`
    );

    return order;
  }
}

