const { db } = require('../../db');

class Users {
  /// Get All
  static async get() {
    const results = await db('users')
      .select('*')
    return results;
  };



  /// Paginate
  static async getAllPaginated(skip, limit) {
    const results = await db('users')
      .select('*')
      .orderBy('id', 'asc')
      .limit(limit)
      .offset(skip);
    return results;
  }
};


module.exports = { Users };
