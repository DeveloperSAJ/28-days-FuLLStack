import pool from '../config/db.js';
import bcrypt from 'bcrypt';

class User {
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, username, email, created_at FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(userData) {
    const { username, email, password } = userData;
    
    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    
    const query = `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at
    `;
    
    const result = await pool.query(query, [username, email, password_hash]);
    return result.rows[0];
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  static async updateProfile(id, updateData) {
    const { username, email } = updateData;
    const query = `
      UPDATE users 
      SET username = $1, email = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING id, username, email, created_at
    `;
    const result = await pool.query(query, [username, email, id]);
    return result.rows[0];
  }

  static async changePassword(id, newPassword) {
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(newPassword, saltRounds);
    
    const query = `
      UPDATE users 
      SET password_hash = $1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id
    `;
    const result = await pool.query(query, [password_hash, id]);
    return result.rows[0];
  }

  static async addFavorite(userId, itemType, itemId) {
    let query;
    if (itemType === 'plant') {
      query = `
        INSERT INTO favorites (user_id, plant_id)
        VALUES ($1, $2)
        RETURNING id
      `;
    } else {
      query = `
        INSERT INTO favorites (user_id, tree_id)
        VALUES ($1, $2)
        RETURNING id
      `;
    }
    
    const result = await pool.query(query, [userId, itemId]);
    return result.rows[0];
  }

  static async removeFavorite(userId, itemType, itemId) {
    let query;
    if (itemType === 'plant') {
      query = 'DELETE FROM favorites WHERE user_id = $1 AND plant_id = $2';
    } else {
      query = 'DELETE FROM favorites WHERE user_id = $1 AND tree_id = $2';
    }
    
    const result = await pool.query(query, [userId, itemId]);
    return result.rowCount > 0;
  }

  static async getFavorites(userId) {
    const query = `
      SELECT 
        f.id as favorite_id,
        f.created_at as favorited_at,
        CASE 
          WHEN f.plant_id IS NOT NULL THEN 'plant'
          ELSE 'tree'
        END as item_type,
        COALESCE(
          jsonb_build_object(
            'id', p.id,
            'name', p.name,
            'scientific_name', p.scientific_name,
            'image_url', p.image_url,
            'category_name', c.name
          ),
          jsonb_build_object(
            'id', t.id,
            'name', t.name,
            'scientific_name', t.scientific_name,
            'image_url', t.image_url,
            'category_name', c2.name
          )
        ) as item
      FROM favorites f
      LEFT JOIN plants p ON f.plant_id = p.id
      LEFT JOIN trees t ON f.tree_id = t.id
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN categories c2 ON t.category_id = c2.id
      WHERE f.user_id = $1
      ORDER BY f.created_at DESC
    `;
    
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async addReview(userId, itemType, itemId, rating, comment) {
    let query;
    if (itemType === 'plant') {
      query = `
        INSERT INTO reviews (user_id, plant_id, rating, comment)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `;
    } else {
      query = `
        INSERT INTO reviews (user_id, tree_id, rating, comment)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `;
    }
    
    const result = await pool.query(query, [userId, itemId, rating, comment]);
    return result.rows[0];
  }

  static async getReviews(userId) {
    const query = `
      SELECT 
        r.id,
        r.rating,
        r.comment,
        r.created_at,
        CASE 
          WHEN r.plant_id IS NOT NULL THEN 'plant'
          ELSE 'tree'
        END as item_type,
        COALESCE(
          jsonb_build_object(
            'id', p.id,
            'name', p.name
          ),
          jsonb_build_object(
            'id', t.id,
            'name', t.name
          )
        ) as item
      FROM reviews r
      LEFT JOIN plants p ON r.plant_id = p.id
      LEFT JOIN trees t ON r.tree_id = t.id
      WHERE r.user_id = $1
      ORDER BY r.created_at DESC
    `;
    
    const result = await pool.query(query, [userId]);
    return result.rows;
  }
}

export default User;