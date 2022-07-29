const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);

  //connection.release(); //added by kengwoh
  return results;
}

module.exports = {
  query
}