const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const error = require("../shared/error");

async function getMultiple() {
  //const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * 
        FROM orders WHERE isdeleted=0
        `
  );
  return rows;
}

async function getDashboard_OrderType() {
  const rows = await db.query(
    `SELECT id, order_type
        FROM orders WHERE isdeleted=0 `
  );
  return rows;
}

async function getDashboard_ProductType() {
  const rows = await db.query(
    `SELECT id, product_type
        FROM orders WHERE isdeleted=0 `
  );
  return rows;
}

async function findById(id) {
  const rows = await db.query(
    `SELECT * 
        FROM orders 
        WHERE id = '${id}' or uuid='${id}'`
  );

  for (var i = 0; i <= rows.length - 1; i++) {
    rows[i].attachment = [];
    const res = await db.query(
      `SELECT id, attachment_type, name, type, size, path FROM order_attachment WHERE order_id='${rows[i].uuid}'`
    );
    if (res) {
      rows[i].attachment = res;
    }
  }

  return rows[0];
}

async function findById2(id) {
  const rows = await db.query(
    `SELECT *  
        FROM orders 
        WHERE uuid='${id}'`
  );

  for (var i = 0; i <= rows.length - 1; i++) {
    rows[i].attachment = [];
    const res = await db.query(
      `SELECT id, attachment_type, name, type, size, path FROM order_attachment WHERE order_id='${rows[i].uuid}'`
    );
    if (res) {
      rows[i].attachment = res;
    }
  }

  return rows;
}

async function findAttachment(id) {
  const rows = await db.query(
    `SELECT id, attachment_type, name, type, size, path FROM order_attachment WHERE order_id='${id}'`
  );
  return rows;
}

async function findAll(page, numPerPage, query) {
  if (!page) page = 0;
  if (!numPerPage) numPerPage = config.numPerPage;
  const offset = helper.getOffset(page, numPerPage);

  let sql = "";
  let sqlcount = "";

  if (query.status) {
    sql = `SELECT * FROM orders WHERE isdeleted=0 and form_status='${query.status}' LIMIT ${offset},${numPerPage}`;
    sqlcount = `SELECT count(*) as numRows FROM orders WHERE isdeleted=0 and form_status='${query.status}'`;
  } else {
    sql = `SELECT * FROM orders WHERE isdeleted=0 LIMIT ${offset},${numPerPage}`;
    sqlcount = `SELECT count(*) as numRows FROM orders WHERE isdeleted=0`;
  }
  const rows = await db.query(sql);
  const rowsCount = await db.query(sqlcount);

  const totalNum = rowsCount[0].numRows;

  for (var i = 0; i <= rows.length - 1; i++) {
    rows[i].attachment = [];
    const res = await db.query(
      `SELECT id, attachment_type, name, type, size, path FROM order_attachment WHERE order_id='${rows[i].uuid}'`
    );
    if (res) {
      rows[i].attachment = res;
    }
    //console.log(rows[i]);
  }

  const data = helper.emptyOrRows(rows);
  const meta = { page, numPerPage, totalNum };

  return { data, meta };
}

async function findAll2(page, numPerPage, query) {
  if (!page) page = 1;
  if (!numPerPage) numPerPage = config.numPerPage;
  const offset = helper.getOffset(page, numPerPage);

  let sql = "";
  let sqlcount = "";

  if (query.status) {
    sql = `SELECT * FROM orders WHERE isdeleted=0 and form_status='${query.status}' LIMIT ${offset},${numPerPage}`;
    sqlcount = `SELECT count(*) as numRows FROM orders WHERE isdeleted=0 and form_status='${query.status}'`;
  } else {
    sql = `SELECT * FROM orders WHERE isdeleted=0 LIMIT ${offset},${numPerPage}`;
    sqlcount = `SELECT count(*) as numRows FROM orders WHERE isdeleted=0`;
  }
  const rows = await db.query(sql);
  const rowsCount = await db.query(sqlcount);

  const totalNum = rowsCount[0].numRows;

  for (var i = 0; i <= rows.length - 1; i++) {
    rows[i].attachment = [];
    const res = await db.query(
      `SELECT id, attachment_type, name, type, size, path FROM order_attachment WHERE order_id='${rows[i].uuid}'`
    );
    if (res) {
      rows[i].attachment = res;
    }
    //console.log(rows[i]);
  }

  const data = helper.emptyOrRows(rows);
  const meta = { page, numPerPage, totalNum };

  return { data, meta };
}

async function find(query) {
  let sql = "";

  if (query.status) {
    sql = `SELECT * FROM orders WHERE form_status ='${query.status}' `;
  } else {
    sql = `SELECT * FROM orders`;
  }

  const rows = await db.query(sql);
  return rows;
}

async function create2(order) {
  var files = order.files;
  var order = order.body;

  if (order.order_type === undefined) order.order_type = "";
  if (order.service_id === undefined) order.service_id = "";
  if (order.network_id === undefined) order.network_id = "";
  if (order.product_type === undefined) order.product_type = "";
  if (order.customer === undefined) order.customer = "";
  if (order.customer_id === undefined) order.customer_id = "";
  if (order.quantity === undefined) order.quantity = "";
  if (order.others === undefined) order.others = "";
  if (order.remark === undefined) order.remark = "";
  if (order.wiring === undefined) order.wiring = "";
  if (order.app_date === undefined)
    order.app_date = new Date().toISOString().replace(/T.+/, "");
  if (order.ae_name === undefined) order.ae_name = "";
  if (order.staff_id === undefined) order.staff_id = "";
  if (order.pm_name === undefined) order.pm_name = "";
  if (order.tid_manager === undefined) order.tid_manager = "";
  if (order.ae_no === undefined) order.ae_no = "";
  if (order.cost_center === undefined) order.cost_center = "";
  if (order.form_status === undefined) order.form_status = "";
  if (order.form_remark === undefined) order.form_remark = "";
  if (order.sector === undefined) order.sector = "";
  if (order.sfdc_id === undefined) order.sfdc_id = "";
  if (order.vertical === undefined) order.vertical = "";
  if (order.hqstate === undefined) order.hqstate = "";
  if (order.contract_no === undefined) order.contract_no = "";
  if (order.scope === undefined) order.scope = "";
  if (order.submission_category === undefined) order.submission_category = "";
  if (order.po_date === undefined)
    order.po_date = new Date().toISOString().replace(/T.+/, "");
  if (order.project_single === undefined) order.project_single = "";
  if (order.sitename === undefined) order.sitename = "";
  if (order.contact_no === undefined) order.contact_no = "";
  if (order.assign_by === undefined) order.assign_by = "";
  if (order.name === undefined) order.name = "";
  if (order.type === undefined) order.type = "";
  if (order.size === undefined) order.size = 0;
  if (order.name2 === undefined) order.name2 = "";
  if (order.type2 === undefined) order.type2 = "";
  if (order.size2 === undefined) order.size2 = 0;
  if (order.name3 === undefined) order.name3 = "";
  if (order.type3 === undefined) order.type3 = "";
  if (order.size3 === undefined) order.size3 = 0;
  if (order.name4 === undefined) order.name4 = "";
  if (order.type4 === undefined) order.type4 = "";
  if (order.size4 === undefined) order.size4 = 0;
  if (order.sc_name === undefined) order.sc_name = "";
  if (order.sd_manager === undefined) order.sd_manager = "";

  let sql = `INSERT INTO orders(uuid, order_type, service_id, network_id, product_type 
            , customer, customer_id, quantity, others
            , remark, wiring, app_date, ae_name
            , staff_id, pm_name, tid_manager, ae_no
            , cost_center, form_status, form_remark, sector
            , sfdc_id, vertical, hqstate, contract_no
            , scope, submission_category, po_date, project_single
            , sitename, contact_no, assign_by
            
            , sc_name, sd_manager, pricing, quartely
            , yearly
            ) VALUES (uuid(), '${order.order_type}', '${order.service_id}', '${order.network_id}', '${order.product_type}'
            , '${order.customer}', '${order.customer_id}', '${order.quantity}', '${order.others}'
            , '${order.remark}', '${order.wiring}', '${order.app_date}', '${order.ae_name}'
            , '${order.staff_id}', '${order.pm_name}', '${order.tid_manager}', '${order.ae_no}'
            , '${order.cost_center}', '${order.form_status}', '${order.form_remark}', '${order.sector}'
            , '${order.sfdc_id}', '${order.vertical}', '${order.hqstate}', '${order.contract_no}'
            , '${order.scope}', '${order.submission_category}', '${order.po_date}', '${order.project_single}'
            , '${order.sitename}', '${order.contact_no}', '${order.assign_by}'
           
            , '${order.sc_name}', '${order.sd_manager}', '${order.pricing}', '${order.quartely}'
            , '${order.yearly}'
            )`;
  //console.log(sql);

  // // create order table first
  // const result = await db.query(
  //    sql
  // )
  let message = error.RECORD_ERROR;
  const result = await db.query(sql);

  if (result.affectedRows) {
    const result1 = await db.query(
      `SELECT uuid FROM orders WHERE id='${result.insertId}'`
    );
    console.log(result1);
    if (result1.length != 0) {
      console.log(result1[0].uuid);
      if (files) {
        let sql2 =
          "INSERT INTO order_attachment(order_id, attachment_type, name, type, size, path) VALUES ";
        let sql2value = "";
        if (files["file1"]) {
          if (sql2value != "") sql2value += ",";
          sql2value += `('${result1[0].uuid}','${files["file1"][0].fieldname}','${files["file1"][0].originalname}','${files["file1"][0].mimetype}','${files["file1"][0].size}','${files["file1"][0].path}')`;
        }
        if (files["file2"]) {
          if (sql2value != "") sql2value += ",";
          sql2value += `('${result1[0].uuid}','${files["file2"][0].fieldname}','${files["file2"][0].originalname}','${files["file2"][0].mimetype}','${files["file2"][0].size}','${files["file2"][0].path}')`;
        }
        if (files["file3"]) {
          if (sql2value != "") sql2value += ",";
          sql2value += `('${result1[0].uuid}','${files["file3"][0].fieldname}','${files["file3"][0].originalname}','${files["file3"][0].mimetype}','${files["file3"][0].size}','${files["file3"][0].path}')`;
        }
        if (files["file4"]) {
          if (sql2value != "") sql2value += ",";
          sql2value += `('${result1[0].uuid}','${files["file4"][0].fieldname}','${files["file4"][0].originalname}','${files["file4"][0].mimetype}','${files["file4"][0].size}','${files["file4"][0].path}')`;
        }
        if (files["file5"]) {
          if (sql2value != "") sql2value += ",";
          sql2value += `('${result1[0].uuid}','${files["file5"][0].fieldname}','${files["file5"][0].originalname}','${files["file5"][0].mimetype}','${files["file5"][0].size}','${files["file5"][0].path}')`;
        }
        if (files["file6"]) {
          if (sql2value != "") sql2value += ",";
          sql2value += `('${result1[0].uuid}','${files["file6"][0].fieldname}','${files["file6"][0].originalname}','${files["file6"][0].mimetype}','${files["file6"][0].size}','${files["file6"][0].path}')`;
        }
        sql2 += sql2value.replace(/\\/g, "\\\\");
        //console.log(sql2);
        const result2 = await db.query(sql2);
        if (result2.affectedRows) {
          message = error.RECORD_CREATED;
        }
      } else {
        message = error.RECORD_CREATED;
      }
    }
  }

  return { message };
}

async function create(order) {
  var files = order.files;
  var order = order.body;

  if (order.order_type === undefined) order.order_type = "";
  if (order.service_id === undefined) order.service_id = "";
  if (order.network_id === undefined) order.network_id = "";
  if (order.product_type === undefined) order.product_type = "";
  if (order.customer === undefined) order.customer = "";
  if (order.customer_id === undefined) order.customer_id = "";
  if (order.quantity === undefined) order.quantity = "";
  if (order.others === undefined) order.others = "";
  if (order.remark === undefined) order.remark = "";
  if (order.wiring === undefined) order.wiring = "";
  if (order.app_date === undefined)
    order.app_date = new Date().toISOString().replace(/T.+/, "");
  if (order.ae_name === undefined) order.ae_name = "";
  if (order.staff_id === undefined) order.staff_id = "";
  if (order.pm_name === undefined) order.pm_name = "";
  if (order.tid_manager === undefined) order.tid_manager = "";
  if (order.ae_no === undefined) order.ae_no = "";
  if (order.cost_center === undefined) order.cost_center = "";
  if (order.form_status === undefined) order.form_status = "";
  if (order.form_remark === undefined) order.form_remark = "";
  if (order.sector === undefined) order.sector = "";
  if (order.sfdc_id === undefined) order.sfdc_id = "";
  if (order.vertical === undefined) order.vertical = "";
  if (order.hqstate === undefined) order.hqstate = "";
  if (order.contract_no === undefined) order.contract_no = "";
  if (order.scope === undefined) order.scope = "";
  if (order.submission_category === undefined) order.submission_category = "";
  if (order.po_date === undefined)
    order.po_date = new Date().toISOString().replace(/T.+/, "");
  if (order.project_single === undefined) order.project_single = "";
  if (order.sitename === undefined) order.sitename = "";
  if (order.contact_no === undefined) order.contact_no = "";
  if (order.assign_by === undefined) order.assign_by = "";
  if (order.name === undefined) order.name = "";
  if (order.type === undefined) order.type = "";
  if (order.size === undefined) order.size = 0;
  if (order.name2 === undefined) order.name2 = "";
  if (order.type2 === undefined) order.type2 = "";
  if (order.size2 === undefined) order.size2 = 0;
  if (order.name3 === undefined) order.name3 = "";
  if (order.type3 === undefined) order.type3 = "";
  if (order.size3 === undefined) order.size3 = 0;
  if (order.name4 === undefined) order.name4 = "";
  if (order.type4 === undefined) order.type4 = "";
  if (order.size4 === undefined) order.size4 = 0;
  if (order.name5 === undefined) order.name5 = "";
  if (order.type5 === undefined) order.type5 = "";
  if (order.size5 === undefined) order.size5 = 0;
  if (order.name6 === undefined) order.name6 = "";
  if (order.type6 === undefined) order.type6 = "";
  if (order.size6 === undefined) order.size6 = 0;
  if (order.sc_name === undefined) order.sc_name = "";
  if (order.sd_manager === undefined) order.sd_manager = "";

  let sql = `INSERT INTO orders(uuid, order_type, service_id, network_id, product_type 
            , customer, customer_id, quantity, others
            , remark, wiring, app_date, ae_name
            , staff_id, pm_name, tid_manager, ae_no
            , cost_center, form_status, form_remark, sector
            , sfdc_id, vertical, hqstate, contract_no
            , scope, submission_category, po_date, project_single
            , sitename, contact_no, assign_by
            
            , sc_name, sd_manager, pricing, quartely
            , yearly
            ) VALUES (uuid(), '${order.order_type}', '${order.service_id}', '${order.network_id}', '${order.product_type}'
            , '${order.customer}', '${order.customer_id}', '${order.quantity}', '${order.others}'
            , '${order.remark}', '${order.wiring}', '${order.app_date}', '${order.ae_name}'
            , '${order.staff_id}', '${order.pm_name}', '${order.tid_manager}', '${order.ae_no}'
            , '${order.cost_center}', '${order.form_status}', '${order.form_remark}', '${order.sector}'
            , '${order.sfdc_id}', '${order.vertical}', '${order.hqstate}', '${order.contract_no}'
            , '${order.scope}', '${order.submission_category}', '${order.po_date}', '${order.project_single}'
            , '${order.sitename}', '${order.contact_no}', '${order.assign_by}'
           
            , '${order.sc_name}', '${order.sd_manager}', '${order.pricing}', '${order.quartely}'
            , '${order.yearly}'
            )`;
  //console.log(sql);

  // create order table first
  // const result = await db.query(sql);
  let message = error.RECORD_ERROR;

  const result = await db.query(sql);

  if (result.affectedRows) {
    const result1 = await db.query(
      `SELECT uuid FROM orders WHERE id='${result.insertId}'`
    );
    console.log(result1);
    if (result1.length != 0) {
      console.log(result1[0].uuid);
      if (files) {
        let sql2 =
          "INSERT INTO order_attachment(order_id, attachment_type, name, type, size, path) VALUES ";
        let sql2value = "";
        if (files["file1"]) {
          if (sql2value != "") sql2value += ",";
          sql2value += `('${result1[0].uuid}','${files["file1"][0].fieldname}','${files["file1"][0].originalname}','${files["file1"][0].mimetype}','${files["file1"][0].size}','${files["file1"][0].path}')`;
        }
        if (files["file2"]) {
          if (sql2value != "") sql2value += ",";
          sql2value += `('${result1[0].uuid}','${files["file2"][0].fieldname}','${files["file2"][0].originalname}','${files["file2"][0].mimetype}','${files["file2"][0].size}','${files["file2"][0].path}')`;
        }
        if (files["file3"]) {
          if (sql2value != "") sql2value += ",";
          sql2value += `('${result1[0].uuid}','${files["file3"][0].fieldname}','${files["file3"][0].originalname}','${files["file3"][0].mimetype}','${files["file3"][0].size}','${files["file3"][0].path}')`;
        }
        if (files["file4"]) {
          if (sql2value != "") sql2value += ",";
          sql2value += `('${result1[0].uuid}','${files["file4"][0].fieldname}','${files["file4"][0].originalname}','${files["file4"][0].mimetype}','${files["file4"][0].size}','${files["file4"][0].path}')`;
        }
        if (files["file5"]) {
          if (sql2value != "") sql2value += ",";
          sql2value += `('${result1[0].uuid}','${files["file5"][0].fieldname}','${files["file5"][0].originalname}','${files["file5"][0].mimetype}','${files["file5"][0].size}','${files["file5"][0].path}')`;
        }
        if (files["file6"]) {
          if (sql2value != "") sql2value += ",";
          sql2value += `('${result1[0].uuid}','${files["file6"][0].fieldname}','${files["file6"][0].originalname}','${files["file6"][0].mimetype}','${files["file6"][0].size}','${files["file6"][0].path}')`;
        }
        sql2 += sql2value.replace(/\\/g, "\\\\");
        //console.log(sql2);
        const result2 = await db.query(sql2);
        if (result2.affectedRows) {
          message = error.RECORD_CREATED;
        }
      } else {
        message = error.RECORD_CREATED;
      }
    }
  }

  return { message };
}

async function findByIdAndUpdate(id, order) {
  var files = order.files;
  var order = order.body;

  let sql = "UPDATE orders SET ";
  let sqlvalue = "updateAt =current_timestamp ";

  // if (files) {
  //   if (files["file1"]) {
  //     order.name = files["file1"][0].originalname;
  //     order.type = files["file1"][0].mimetype;
  //     order.size = files["file1"][0].size;
  //     order.content = files["file1"][0].buffer.toString("base64");
  //   }
  //   if (files["file2"]) {
  //     order.name2 = files["file2"][0].originalname;
  //     order.type2 = files["file2"][0].mimetype;
  //     order.size2 = files["file2"][0].size;
  //     order.content2 = files["file2"][0].buffer.toString("base64");
  //   }
  //   if (files["file3"]) {
  //     order.name3 = files["file3"][0].originalname;
  //     order.type3 = files["file3"][0].mimetype;
  //     order.size3 = files["file3"][0].size;
  //     order.content3 = files["file3"][0].buffer.toString("base64");
  //   }
  //   if (files["file4"]) {
  //     order.name4 = files["file4"][0].originalname;
  //     order.type4 = files["file4"][0].mimetype;
  //     order.size4 = files["file4"][0].size;
  //     order.content4 = files["file4"][0].buffer.toString("base64");
  //   }
  //   if (files["file5"]) {
  //     order.name5 = files["file5"][0].originalname;
  //     order.type5 = files["file5"][0].mimetype;
  //     order.size5 = files["file5"][0].size;
  //     order.content5 = files["file5"][0].buffer.toString("base64");
  //   }
  //   if (files["file6"]) {
  //     order.name6 = files["file6"][0].originalname;
  //     order.type6 = files["file6"][0].mimetype;
  //     order.size6 = files["file6"][0].size;
  //     order.content6 = files["file6"][0].buffer.toString("base64");
  //   }
  //   if (files["file7"]) {
  //     order.name7 = files["file7"][0].originalname;
  //     order.type7 = files["file7"][0].mimetype;
  //     order.size7 = files["file7"][0].size;
  //     order.content7 = files["file7"][0].buffer.toString("base64");
  //   }
  //   if (files["file8"]) {
  //     order.name8 = files["file8"][0].originalname;
  //     order.type8 = files["file8"][0].mimetype;
  //     order.size8 = files["file8"][0].size;
  //     order.content8 = files["file8"][0].buffer.toString("base64");
  //   }
  //   if (files["file9"]) {
  //     order.name9 = files["file9"][0].originalname;
  //     order.type9 = files["file9"][0].mimetype;
  //     order.size9 = files["file9"][0].size;
  //     order.content9 = files["file9"][0].buffer.toString("base64");
  //   }
  // }

  if (order.order_type) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `order_type ='${order.order_type}'`;
  }
  if (order.service_id) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `service_id ='${order.service_id}'`;
  }
  if (order.network_id) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `network_id ='${order.network_id}'`;
  }
  if (order.product_type) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `product_type ='${order.product_type}'`;
  }
  if (order.customer) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `customer ='${order.customer}'`;
  }
  if (order.customer_id) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `customer_id ='${order.customer_id}'`;
  }
  if (order.quantity) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `quantity ='${order.quantity}'`;
  }
  if (order.others) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `others ='${order.others}'`;
  }
  if (order.remark) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `remark ='${order.remark}'`;
  }
  if (order.wiring) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `wiring ='${order.wiring}'`;
  }
  if (order.app_date) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `app_date ='${order.app_date}'`;
  }
  /*
        Some of field not able to change
        order.ae_name 
        order.ae_no 
        order.staff_id
        order.cost_center
    */
  if (order.pm_name) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `pm_name ='${order.pm_name}'`;
  }
  if (order.tid_manager) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `tid_manager ='${order.tid_manager}'`;
  }
  if (order.form_status) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `form_status ='${order.form_status}'`;
  }
  if (order.form_remark) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `form_remark ='${order.form_remark}'`;
  }
  if (order.sector) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `sector ='${order.sector}'`;
  }
  if (order.sfdc_id) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `sfdc_id ='${order.sfdc_id}'`;
  }
  if (order.vertical) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `vertical ='${order.vertical}'`;
  }
  if (order.hqstate) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `hqstate ='${order.hqstate}'`;
  }
  if (order.contract_no) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `contract_no ='${order.contract_no}'`;
  }
  if (order.scope) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `scope ='${order.scope}'`;
  }
  if (order.submission_category) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `submission_category ='${order.submission_category}'`;
  }
  if (order.po_date) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `po_date ='${order.po_date}'`;
  }
  if (order.project_single) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `project_single ='${order.project_single}'`;
  }
  if (order.sitename) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `sitename ='${order.sitename}'`;
  }
  if (order.contact_no) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `contact_no ='${order.contact_no}'`;
  }
  if (order.assign_by) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `assign_by ='${order.assign_by}'`;
  }
  if (order.sc_name) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `sc_name ='${order.sc_name}'`;
  }
  if (order.sd_manager) {
    if (sqlvalue != "") sqlvalue += ",";
    sqlvalue += `sd_manager ='${order.sd_manager}'`;
  }

  // if (order.name) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `name ='${order.name}'`;
  // }
  // if (order.type) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `type ='${order.type}'`;
  // }
  // if (order.size) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `size ='${order.size}'`;
  // }
  // if (order.content) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `content ='${order.content}'`;
  // }
  // if (order.name2) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `name2 ='${order.name2}'`;
  // }
  // if (order.type2) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `type2 ='${order.type2}'`;
  // }
  // if (order.size2) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `size2 ='${order.size2}'`;
  // }
  // if (order.content2) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `content2 ='${order.content2}'`;
  // }
  // if (order.name3) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `name3 ='${order.name3}'`;
  // }
  // if (order.type3) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `type3 ='${order.type3}'`;
  // }
  // if (order.size3) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `size3 ='${order.size3}'`;
  // }
  // if (order.content3) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `content3 ='${order.content3}'`;
  // }
  // if (order.name4) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `name4 ='${order.name4}'`;
  // }
  // if (order.type4) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `type4 ='${order.type4}'`;
  // }
  // if (order.size4) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `size4 ='${order.size4}'`;
  // }
  // if (order.content4) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `content4 ='${order.content4}'`;
  // }
  // if (order.name5) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `name5 ='${order.name5}'`;
  // }
  // if (order.type5) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `type5 ='${order.type5}'`;
  // }
  // if (order.size6) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `size6 ='${order.size6}'`;
  // }
  // if (order.content6) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `content6 ='${order.content6}'`;
  // }
  // if (order.name7) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `name7 ='${order.name7}'`;
  // }
  // if (order.type7) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `type7 ='${order.type7}'`;
  // }
  // if (order.size7) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `size7 ='${order.size7}'`;
  // }
  // if (order.content7) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `content7 ='${order.content7}'`;
  // }
  // if (order.name8) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `name8 ='${order.name8}'`;
  // }
  // if (order.type8) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `type8 ='${order.type8}'`;
  // }
  // if (order.size8) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `size8 ='${order.size8}'`;
  // }
  // if (order.content8) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `content8 ='${order.content8}'`;
  // }
  // if (order.name9) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `name9 ='${order.name9}'`;
  // }
  // if (order.type9) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `type9 ='${order.type9}'`;
  // }
  // if (order.size9) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `size9 ='${order.size9}'`;
  // }
  // if (order.content9) {
  //   if (sqlvalue != "") sqlvalue += ",";
  //   sqlvalue += `content9 ='${order.content9}'`;
  // }

  sql += sqlvalue + ` WHERE uuid='${id}'`;
  console.log(sql);

  let message = error.RECORD_ERROR;
  const result = await db.query(sql);

  if (result.affectedRows) {
    if (files) {
      let sql2 = "";
      if (files["file1"]) {
        sql2 += `call sp_update_order_attachment('${id}','${files["file1"][0].fieldname}','${files["file1"][0].originalname}','${files["file1"][0].mimetype}','${files["file1"][0].size}','${files["file1"][0].path}');`;
      }
      if (files["file2"]) {
        sql2 += `call sp_update_order_attachment('${id}','${files["file2"][0].fieldname}','${files["file2"][0].originalname}','${files["file2"][0].mimetype}','${files["file2"][0].size}','${files["file2"][0].path}');`;
      }
      if (files["file3"]) {
        sql2 += `call sp_update_order_attachment('${id}','${files["file3"][0].fieldname}','${files["file3"][0].originalname}','${files["file3"][0].mimetype}','${files["file3"][0].size}','${files["file3"][0].path}');`;
      }
      if (files["file4"]) {
        sql2 += `call sp_update_order_attachment('${id}','${files["file4"][0].fieldname}','${files["file4"][0].originalname}','${files["file4"][0].mimetype}','${files["file4"][0].size}','${files["file4"][0].path}');`;
      }
      if (files["file5"]) {
        sql2 += `call sp_update_order_attachment('${id}','${files["file5"][0].fieldname}','${files["file5"][0].originalname}','${files["file5"][0].mimetype}','${files["file5"][0].size}','${files["file5"][0].path}');`;
      }
      if (files["file6"]) {
        sql2 += `call sp_update_order_attachment('${id}','${files["file6"][0].fieldname}','${files["file6"][0].originalname}','${files["file6"][0].mimetype}','${files["file6"][0].size}','${files["file6"][0].path}');`;
      }
      if (files["file7"]) {
        sql2 += `call sp_update_order_attachment('${id}','${files["file7"][0].fieldname}','${files["file7"][0].originalname}','${files["file7"][0].mimetype}','${files["file7"][0].size}','${files["file7"][0].path}');`;
      }
      if (files["file8"]) {
        sql2 += `call sp_update_order_attachment('${id}','${files["file8"][0].fieldname}','${files["file8"][0].originalname}','${files["file8"][0].mimetype}','${files["file8"][0].size}','${files["file8"][0].path}');`;
      }
      if (files["file9"]) {
        sql2 += `call sp_update_order_attachment('${id}','${files["file9"][0].fieldname}','${files["file9"][0].originalname}','${files["file9"][0].mimetype}','${files["file9"][0].size}','${files["file9"][0].path}');`;
      }

      const result2 = await db.query(sql2.replace(/\\/g, "\\\\"));
      if (result2.affectedRows) {
        message = error.RECORD_UPDATED;
      }
    } else {
      message = error.RECORD_UPDATED;
    }
  }
  return { message };

  // const result = await db.query(sql);

  // if (result.affectedRows) {
  //   message = error.RECORD_UPDATED;
  // }
  // return { message };
}

async function findByIdAndRemove(id) {
  const result = await db.query(
    `UPDATE orders SET isdeleted=1 WHERE id='${id}'`
  );
  let message = error.RECORD_ERROR;
  if (result.affectedRows) {
    message = error.RECORD_DELETED;
  }
  return { message };
}

module.exports = {
  getMultiple,
  getDashboard_OrderType,
  getDashboard_ProductType,
  findById,
  findById2,
  find,
  findAll,
  findAll2,
  create,
  create2,
  findByIdAndUpdate,
  findByIdAndRemove,
};
