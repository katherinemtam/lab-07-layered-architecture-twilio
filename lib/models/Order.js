import pool from '../utils/pool.js';

export default class Order {
  id;
  item;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.item = row.item;
    this.quantity = row.quantity;
  }

  static async insert({ item, quantity }) {
    
    const { rows } = await pool.query(`
      INSERT INTO orders (item, quantity)
      VALUES      ($1, $2)
      RETURNING   *
    `, [item, quantity]);

    return new Order(rows[0]);
  }

  static async findById(id) {

    const { rows } = await pool.query(`
      SELECT *
      FROM   orders
      WHERE  id = $1
    `, [id]);

    return new Order(rows[0]);
  }

  static async findAll() {

    const { rows } = await pool.query(`
      SELECT *
      FROM   orders
    `);

    return rows.map(row => new Order(row));
  }
}
