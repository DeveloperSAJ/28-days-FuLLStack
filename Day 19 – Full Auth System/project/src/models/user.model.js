import db from '../config/database.js';

class UserModel {
  async create(userData) {
    const { username, email, password, role = 'user' } = userData;
    const query = `
      INSERT INTO users (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, role, created_at
    `;
    const values = [username, email, password, role];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  async findByUsername(username) {
    const query = 'SELECT * FROM users WHERE username = $1';
    const result = await db.query(query, [username]);
    return result.rows[0];
  }

  async findById(id) {
    const query = 'SELECT id, username, email, role, created_at FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async updateLastLogin(id) {
    const query = 'UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = $1';
    await db.query(query, [id]);
  }

  async findAll() {
        const query = `
            SELECT id, username, email, role, created_at, updated_at 
            FROM users 
            ORDER BY created_at DESC
        `;
        const result = await db.query(query);
        return result.rows;
    }

    // Update user
    async update(id, { username, email }) {
        const query = `
            UPDATE users 
            SET username = COALESCE($1, username),
                email = COALESCE($2, email),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING id, username, email, role, created_at, updated_at
        `;
        const values = [username, email, id];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    // Update user role (admin only)
    async updateRole(id, role) {
        const query = `
            UPDATE users 
            SET role = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING id, username, email, role, created_at, updated_at
        `;
        const values = [role, id];
        const result = await db.query(query, values);
        return result.rows[0];
    }

    // Delete user
    async delete(id) {
        const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
        const result = await db.query(query, [id]);
        return result.rows[0];
    }

    // Count total users
    async countUsers() {
        const query = 'SELECT COUNT(*) as total FROM users';
        const result = await db.query(query);
        return parseInt(result.rows[0].total);
    }

    // Find recent users
    async findRecent(limit = 5) {
        const query = `
            SELECT id, username, email, role, created_at 
            FROM users 
            ORDER BY created_at DESC 
            LIMIT $1
        `;
        const result = await db.query(query, [limit]);
        return result.rows;
    }

    // Find users by role
    async findByRole(role) {
        const query = `
            SELECT id, username, email, created_at 
            FROM users 
            WHERE role = $1
            ORDER BY created_at DESC
        `;
        const result = await db.query(query, [role]);
        return result.rows;
    }
}


export default new UserModel();



    
