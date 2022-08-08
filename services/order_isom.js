const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const error = require("../shared/error");

async function find(query) {
  let sql = "";
  if (query.order_id) {
    sql = `SELECT * FROM order_isom WHERE order_id='${query.order_id}'`;
  } else {
    sql = `SELECT * FROM order_isom`;
  }
  const rows = await db.query(sql);
  return rows;
}

async function findById(id) {
  const rows = await db.query(`SELECT * FROM order_isom WHERE uuid='${id}'`);
  if (rows.length != 0) {
    return rows[0];
  }
  return error.RECORD_EMPTY;
}

async function findByIdAndUpdate(id, order_isom) {
  let sql = "UPDATE order_isom SET ";
  let sqlvalue = "";

  if (order_isom.order_id) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `order_id='${order_isom.order_id}'`;
  }
  if (order_isom.manager_id) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `manager_id='${order_isom.manager_id}'`;
  }
  if (order_isom.staff_id) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `staff_id='${order_isom.staff_id}'`;
  }
  if (order_isom.assigned_date) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `assigned_date='${order_isom.assigned_date}'`;
  }
  if (order_isom.assigned_no) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `assigned_no='${order_isom.assigned_no}'`;
  }
  if (order_isom.assigned_status) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `assigned_status='${order_isom.assigned_status}'`;
  }

  sql += sqlvalue + ` WHERE uuid='${id}'`;

  let message = error.RECORD_ERROR;
  const result = await db.query(sql);
  if (result.affectedRows) {
    const rows = await db.query(`SELECT * FROM order_isom WHERE uuid='${id}'`);
    return rows[0];
  }
  return { message };
}

async function findByIdAndRemove(id) {
  const result = await db.query(`DELETE FROM order_isom WHERE uuid='${id}'`);
  let message = error.RECORD_ERROR;
  if (result.affectedRows) {
    message = error.RECORD_DELETED;
  }
  return { message };
}

async function create(order_isom) {
  let sql = `INSERT INTO order_isom(uuid, order_id, manager_id, staff_id, assigned_date, assigned_no, assigned_status) 
            VALUES(uuid(), '${order_isom.order_id}', '${order_isom.manager_id}', '${order_isom.staff_id}', current_timestamp, '${order_isom.assigned_no}', '${order_isom.assigned_status}')`;

  let message = error.RECORD_ERROR;
  try {
    const result = await db.query(sql);

    if (result.affectedRows) {
      const rows = await db.query(
        `SELECT * FROM order_isom WHERE id='${result.insertId}'`
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
  findByIdAndUpdate,
  findByIdAndRemove,
  create,
};
