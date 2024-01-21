const db = require('./db');

class UserModel {
  async getAllUsers() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  }

  async getUserById(userId) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    return rows[0];
  }

  async createUser(user) {
    const { username, email } = user;
    await db.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email]);
  }
}

module.exports = new UserModel();
