const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const error = require("../shared/error");
const { resourceLimits } = require("worker_threads");

async function find(query) {
  let sql = "";
  if (query.order_id) {
    sql = `SELECT * FROM orders_detail where order_id='${query.order_id}'`;
  } else {
    sql = `SELECT * FROM orders_detail`;
  }
  const rows = await db.query(sql);
  return rows;
}

async function findById(id) {
  const rows = await db.query(`SELECT * FROM orders_detail WHERE uuid='${id}'`);
  if (rows.length != 0) {
    return rows[0];
  }
  return error.RECORD_EMPTY;
}

async function findByIdAndUpdate(id, item) {
  let sql = "UPDATE orders_detail SET ";
  let sqlvalue = "updateAt = current_timestamp ";

  if (item.sub_id) {
    sqlvalue += `,sub_id='${item.sub_id}'`;
  }
  if (item.quote_no) {
    sqlvalue += `,quote_no='${item.quote_no}'`;
  }
  if (item.order_no) {
    sqlvalue += `,order_no='${item.order_no}'`;
  }
  if (item.acc_no) {
    sqlvalue += `,acc_no='${item.acc_no}'`;
  }
  if (item.location) {
    sqlvalue += `,location='${item.location}'`;
  }
  if (item.order_status) {
    sqlvalue += `,order_status='${item.order_status}'`;
  }
  if (item.remark) {
    sqlvalue += `,remark='${item.remark}'`;
  }
  if (item.pc) {
    sqlvalue += `,pc='${item.pc}'`;
  }
  if (item.process_date) {
    sqlvalue += `,process_date='${item.process_date}'`;
  }
  if (item.stats) {
    sqlvalue += `,stats=''${item.stats}`;
  }
  if (item.actual_processor) {
    sqlvalue += `,actual_processor='${item.actual_processor}'`;
  }
  if (item.mrc) {
    sqlvalue += `,mrc='${item.mrc}'`;
  }
  if (item.otc) {
    sqlvalue += `,otc='${item.otc}'`;
  }
  sql += sqlvalue + ` WHERE uuid='${id}'`;

  let message = error.RECORD_ERROR;
  const result = await db.query(sql);
  if (result.affectedRows) {
    const rows = await db.query(
      `SELECT * FROM orders_detail WHERE uuid='${id}'`
    );
    return rows[0];
  }
  return { message };
}

async function findByIdAndRemove(id) {
  const result = await db.query(`DELETE FROM orders_detail WHERE uuid='${id}'`);
  let message = error.RECORD_ERROR;
  if (result.affectedRows) {
    message = error.RECORD_DELETED;
  }
  return { message };
}

async function create(item) {}

module.exports = {
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndRemove,
  create,
};
