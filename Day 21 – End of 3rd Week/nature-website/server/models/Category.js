import pool from '../config/db.js';

class Category {
  static async findAll() {
    const query = 'SELECT * FROM categories ORDER BY name';
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(id) {
    const query = 'SELECT * FROM categories WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getWithPlants(id) {
    const query = `
      SELECT 
        c.*,
        json_agg(DISTINCT jsonb_build_object(
          'id', p.id, 'name', p.name, 'scientific_name', p.scientific_name,
          'image_url', p.image_url, 'sunlight', p.sunlight
        )) FILTER (WHERE p.id IS NOT NULL) as plants,
        json_agg(DISTINCT jsonb_build_object(
          'id', t.id, 'name', t.name, 'scientific_name', t.scientific_name,
          'image_url', t.image_url, 'height', t.height
        )) FILTER (WHERE t.id IS NOT NULL) as trees
      FROM categories c
      LEFT JOIN plants p ON c.id = p.category_id
      LEFT JOIN trees t ON c.id = t.category_id
      WHERE c.id = $1
      GROUP BY c.id
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

export default Category;