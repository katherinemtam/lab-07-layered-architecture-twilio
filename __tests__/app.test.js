import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Order from '../lib/models/Order.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('creates a new order in our database and sends a text message', async() => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ 
        item: 'food',
        quantity: 100
      });

    expect(res.body).toEqual({
      id: '1',
      item: 'food',
      quantity: 100
    });
  });

  test('finds an order in our database', async() => {
    const order = await Order.insert({
      item: 'makeup',
      quantity: 2
    });
    
    const res = await request(app)
      .get(`/api/v1/orders/${order.id}`);

    expect(res.body).toEqual(order);
  });

  test('finds all orders in our database', async() => {
    const skincare = await  Order.insert({
      item: 'skincare',
      quantity: 50
    });

    const toy = await  Order.insert({
      item: 'toy',
      quantity: 5
    });

    const plant = await  Order.insert({
      item: 'plant',
      quantity: 23
    });

    const res = await request(app)
      .get('/api/v1/orders');

    expect(res.body).toEqual([skincare, toy, plant]);
  });

  test('updates an order in our database and sends a text message', async() => {
    const order = await Order.insert({
      item: 'game',
      quantity: 1
    });

    order.item = 'video game';

    const res = await request(app)
      .put(`/api/v1/orders/${order.id}`)
      .send(order);

    expect(res.body);
  });

  test('deletes an order in out database and sends a text message', async() => {
    const order = await Order.insert({
      item: 'software',
      quantity: 30
    });

    return request(app)
      .delete(`/api/v1/orders/${order.id}`)
      .send({ order })
      .then(res => expect(res.body).toEqual(order));
  });
});
