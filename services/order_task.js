const db = require("./db");
const helper = require("../helper");
const config = require("../config");
const error = require("../shared/error");

async function findById(id) {
  const rows = await db.query(
    `SELECT * FROM order_task WHERE order_id='${id}'`
  );

  if (rows.length != 0) {
    return rows[0];
  }
  return error.RECORD_EMPTY;
}

async function findByIdAndUpdate(id, order_task) {
  // This function will update the record of particular order_id
  // If record not exists then create one
  // If record exists then update
  let sql = "";
  let sqlvalue = "";

  const rows = await findById(id);
  console.log(rows);
  if (rows == error.RECORD_EMPTY) {
    // create
    sql = "INSERT INTO order_task(order_id";
    sqlvalue = `VALUES('${id}'`;

    if (order_task.customerInfo) {
      sql += `,customerInfo`;
      sqlvalue += `,'${order_task.customerInfo}'`;
    }
    if (order_task.siteInfo) {
      sql += `,siteInfo`;
      sqlvalue += `,'${order_task.siteInfo}'`;
    }
    if (order_task.billingAddress) {
      sql += `,billingAddress`;
      sqlvalue += `,'${order_task.billingAddress}'`;
    }
    if (order_task.callPlan) {
      sql += `,callPlan`;
      sqlvalue += `,'${order_task.callPlan}'`;
    }
    if (order_task.projectManager) {
      sql += `,projectManager`;
      sqlvalue += `,'${order_task.projectManager}'`;
    }
    if (order_task.internalWiringReadiness) {
      sql += `,internalWiringReadiness`;
      sqlvalue += `,'${order_task.internalWiringReadiness}'`;
    }
    if (order_task.buildingReadiness) {
      sql += `,buildingReadiness`;
      sqlvalue += `,'${order_task.buildingReadiness}'`;
    }
    if (order_task.icheckSubmitted) {
      sql += `,icheckSubmitted`;
      sqlvalue += `,'${order_task.icheckSubmitted}'`;
    }
    if (order_task.icheckResult) {
      sql += `,icheckResult`;
      sqlvalue += `,'${order_task.icheckResult}'`;
    }
    if (order_task.routerCompatibility) {
      sql += `,routerCompatibility`;
      sqlvalue += `,'${order_task.routerCompatibility}'`;
    }
    if (order_task.feasibilityCheck) {
      sql += `,feasibilityCheck`;
      sqlvalue += `,'${order_task.feasibilityCheck}'`;
    }
    if (order_task.previousOrderCompleted) {
      sql += `,previousOrderCompleted`;
      sqlvalue += `,'${order_task.previousOrderCompleted}'`;
    }
    if (order_task.nrpRefNo) {
      sql += `,nrpRefNo`;
      sqlvalue += `,'${order_task.nrpRefNo}'`;
    }
    if (order_task.nrpRFSDate) {
      sql += `,nrpRFSDate`;
      sqlvalue += `,'${order_task.nrpRFSDate}'`;
    }
    if (order_task.addressBoundary) {
      sql += `,addressBoundary`;
      sqlvalue += `,'${order_task.addressBoundary}'`;
    }
    if (order_task.routerAvailibility) {
      sql += `,routerAvailibility`;
      sqlvalue += `,'${order_task.routerAvailibility}'`;
    }
    if (order_task.numbering) {
      sql += `,numbering`;
      sqlvalue += `,'${order_task.numbering}'`;
    }
    if (order_task.upeId) {
      sql += `,upeId`;
      sqlvalue += `,'${order_task.upeId}'`;
    }
    if (order_task.networkDesignInfo) {
      sql += `,networkDesignInfo`;
      sqlvalue += `,'${order_task.networkDesignInfo}'`;
    }
    if (order_task.networkProfile) {
      sql += `,networkProfile`;
      sqlvalue += `,'${order_task.networkProfile}'`;
    }
    if (order_task.technicalProfile) {
      sql += `,technicalProfile`;
      sqlvalue += `,'${order_task.technicalProfile}'`;
    }
    sql += ")" + sqlvalue + ")";
    console.log(sql);
    const result = await db.query(sql);
    let message = error.RECORD_ERROR;
    if (result.affectedRows) {
      message = error.RECORD_CREATED;
    }
    return { message };
  } else {
    // update
    sql = "UPDATE order_task SET ";
    sqlvalue = " updateAt=current_timestamp";
    if (order_task.customerInfo) {
      sqlvalue += `,customerInfo='${order_task.customerInfo}'`;
    }
    if (order_task.siteInfo) {
      sqlvalue += `,siteInfo='${order_task.siteInfo}'`;
    }
    if (order_task.billingAddress) {
      sqlvalue += `,billingAddress='${order_task.billingAddress}'`;
    }
    if (order_task.callPlan) {
      sqlvalue += `,callPlan='${order_task.callPlan}'`;
    }
    if (order_task.projectManager) {
      sqlvalue += `,projectManager='${order_task.projectManager}'`;
    }
    if (order_task.internalWiringReadiness) {
      sqlvalue += `,internalWiringReadiness='${order_task.internalWiringReadiness}'`;
    }
    if (order_task.buildingReadiness) {
      sqlvalue += `,buildingReadiness='${order_task.buildingReadiness}'`;
    }
    if (order_task.icheckSubmitted) {
      sqlvalue += `,icheckSubmitted='${order_task.icheckSubmitted}'`;
    }
    if (order_task.icheckResult) {
      sqlvalue += `,icheckResult='${order_task.icheckResult}'`;
    }
    if (order_task.routerCompatibility) {
      sqlvalue += `,routerCompatibility='${order_task.routerCompatibility}'`;
    }
    if (order_task.feasibilityCheck) {
      sqlvalue += `,feasibilityCheck='${order_task.feasibilityCheck}'`;
    }
    if (order_task.previousOrderCompleted) {
      sqlvalue += `,previousOrderCompleted='${order_task.previousOrderCompleted}'`;
    }
    if (order_task.nrpRefNo) {
      sqlvalue += `,nrpRefNo='${order_task.nrpRefNo}'`;
    }
    if (order_task.nrpRFSDate) {
      sqlvalue += `,nrpRFSDate='${order_task.nrpRFSDate}'`;
    }
    if (order_task.addressBoundary) {
      sqlvalue += `,addressBoundary='${order_task.addressBoundary}'`;
    }
    if (order_task.routerAvailibility) {
      sqlvalue += `,routerAvailibility='${order_task.routerAvailibility}'`;
    }
    if (order_task.numbering) {
      sqlvalue += `,numbering='${order_task.numbering}'`;
    }
    if (order_task.upeId) {
      sqlvalue += `,upeId='${order_task.upeId}'`;
    }
    if (order_task.networkDesignInfo) {
      sqlvalue += `,networkDesignInfo='${order_task.networkDesignInfo}'`;
    }
    if (order_task.networkProfile) {
      sqlvalue += `,networkProfile='${order_task.networkProfile}'`;
    }
    if (order_task.technicalProfile) {
      sqlvalue += `,technicalProfile='${order_task.technicalProfile}'`;
    }

    sql += sqlvalue + ` WHERE order_id='${id}'`;
    console.log(sql);
    const result = await db.query(sql);
    let message = error.RECORD_ERROR;
    if (result.affectedRows) {
      message = error.RECORD_UPDATED;
    }
    return { message };
  }
}

module.exports = {
  findById,
  findByIdAndUpdate,
};
