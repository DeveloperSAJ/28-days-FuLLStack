import pool from '../config/db.js';

class Tree {
  static async findAll() {
    const query = `
      SELECT t.*, c.name as category_name 
      FROM trees t 
      LEFT JOIN categories c ON t.category_id = c.id
      ORDER BY t.name
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT t.*, c.name as category_name 
      FROM trees t 
      LEFT JOIN categories c ON t.category_id = c.id 
      WHERE t.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByCategory(categoryId) {
    const query = 'SELECT * FROM trees WHERE category_id = $1 ORDER BY name';
    const result = await pool.query(query, [categoryId]);
    return result.rows;
  }

  static async search(searchTerm) {
    const query = `
      SELECT * FROM trees 
      WHERE name ILIKE $1 OR scientific_name ILIKE $1 OR description ILIKE $1
      ORDER BY name
    `;
    const result = await pool.query(query, [`%${searchTerm}%`]);
    return result.rows;
  }

  static async create(treeData) {
    const {
      name, scientific_name, description, category_id, image_url,
      height, spread, growth_rate, soil_type, sunlight, water_needs,
      native_region, is_evergreen
    } = treeData;

    const query = `
      INSERT INTO trees (
        name, scientific_name, description, category_id, image_url,
        height, spread, growth_rate, soil_type, sunlight, water_needs,
        native_region, is_evergreen
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `;

    const values = [
      name, scientific_name, description, category_id, image_url,
      height, spread, growth_rate, soil_type, sunlight, water_needs,
      native_region, is_evergreen
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

export default Tree;