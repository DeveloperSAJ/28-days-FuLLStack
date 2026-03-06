import pool from '../config/db.js';

class Plant {
  static async findAll() {
    const query = `
      SELECT p.*, c.name as category_name 
      FROM plants p 
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.name
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = `
      SELECT p.*, c.name as category_name 
      FROM plants p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByCategory(categoryId) {
    const query = 'SELECT * FROM plants WHERE category_id = $1 ORDER BY name';
    const result = await pool.query(query, [categoryId]);
    return result.rows;
  }

  static async search(searchTerm) {
    const query = `
      SELECT * FROM plants 
      WHERE name ILIKE $1 OR scientific_name ILIKE $1 OR description ILIKE $1
      ORDER BY name
    `;
    const result = await pool.query(query, [`%${searchTerm}%`]);
    return result.rows;
  }

  static async create(plantData) {
    const {
      name, scientific_name, description, category_id, image_url,
      care_instructions, sunlight, watering, temperature, soil_type,
      native_region, bloom_time, is_poisonous
    } = plantData;

    const query = `
      INSERT INTO plants (
        name, scientific_name, description, category_id, image_url,
        care_instructions, sunlight, watering, temperature, soil_type,
        native_region, bloom_time, is_poisonous
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *
    `;

    const values = [
      name, scientific_name, description, category_id, image_url,
      care_instructions, sunlight, watering, temperature, soil_type,
      native_region, bloom_time, is_poisonous
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async update(id, plantData) {
    const {
      name, scientific_name, description, category_id, image_url,
      care_instructions, sunlight, watering, temperature, soil_type,
      native_region, bloom_time, is_poisonous
    } = plantData;

    const query = `
      UPDATE plants SET
        name = $1, scientific_name = $2, description = $3,
        category_id = $4, image_url = $5, care_instructions = $6,
        sunlight = $7, watering = $8, temperature = $9, soil_type = $10,
        native_region = $11, bloom_time = $12, is_poisonous = $13,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $14
      RETURNING *
    `;

    const values = [
      name, scientific_name, description, category_id, image_url,
      care_instructions, sunlight, watering, temperature, soil_type,
      native_region, bloom_time, is_poisonous, id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM plants WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

export default Plant;