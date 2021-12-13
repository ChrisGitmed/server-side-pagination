const { db } = require('../../db');

class Users {
  /// Get All
  static async get() {
    const results = await db('users')
      .select('*')
    return results;
  };



  /// Paginate
  static async getAllPaginated(skip, limit, sort_column, sort_order) {
    const results = await db('users')
      .select('*')
      .orderBy(sort_column, sort_order)
      .limit(limit)
      .offset(skip);
    return results;
  };



  static async getLastPageNumber(limit, whereClause) {
    const [{ count }] = await db('users')
      .count('id')
      .where({ active: true });
    return Math.ceil(count / limit);
  };
};


module.exports = { Users };
