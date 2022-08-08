const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const error = require("../shared/error");

async function find(query) {
  let sql = "";
  if (query.user_id) {
    sql = `SELECT * FROM notifications WHERE user_id='${query.user_id}'`;
  } else {
    sql = `SELECT * FROM notifications`;
  }
  const rows = await db.query(sql);
  return rows;
}

async function findById(id) {
  const rows = await db.query(`SELECT * FROM notifications WHERE uuid='${id}'`);
  if (rows.length != 0) {
    return rows[0];
  }
  return error.RECORD_EMPTY;
}

async function findByIdAndRemove(id) {
  const result = await db.query(`DELETE FROM notifications WHERE uuid='${id}'`);
  let message = error.RECORD_ERROR;
  if (result.affectedRows) {
    message = error.RECORD_DELETED;
  }
  return { message };
}

async function create(notification) {
  let sql = `INSERT INTO notifications(uuid, user_id, title, content, link)
            VALUES(uuid(), '${notification.user_id}','${notification.title}','${notification.content}','${notification.link}')`;

  let message = error.RECORD_ERROR;
  try {
    const result = await db.query(sql);

    if (result.affectedRows) {
      const rows = await db.query(
        `SELECT * FROM notifications WHERE id='${result.insertId}'`
      );
      return rows[0];
    }
    return { message };
  } catch (err) {
    console.log(err);
    return { message };
  }
}

module.exports = {
  find,
  findById,
  findByIdAndRemove,
  create,
};
