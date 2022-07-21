const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const error = require('../shared/error');

async function getMultiple(){
    const rows = await db.query(
        `SELECT * 
        FROM orders 
        `
    );
    return rows;
}

async function create(order){
    //let sql = '';

    // for(var i= 0; i <= (order.length - 1); i++){
    //     if(i=0){

    //     }
    //     else{
    //         sql += ',';
    //     }
    //     sql += `('${order.order_type}', '${order.service_id}', '${order.network_id}', '${order.product_type}'
    //     , '${order.customer}', '${order.customer_id}', '${order.quantity}', '${order.others}'
    //     , '${order.remark}', '${order.wiring}', '${order.app_date}', '${order.ae_name}'
    //     , '${order.staff_id}', '${order.pm_name}', '${order.tid_manager}', '${order.ae_no}'
    //     , '${order.cost_center}', '${order.form_status}', '${order.form_remark}', '${order.sector}'
    //     , '${order.sfdc_id}', '${order.vertical}', '${order.hqstate}', '${order.contract_no}'
    //     , '${order.scope}', '${order.submission_category}', '${order.po_date}', '${order.project_single}'
    //     , '${order.sitename}', '${order.contact_no}', '${order.assign_by}'
    //     , '${order.name}', '${order.type}', '${order.size}'
    //     , '${order.name2}', '${order.type2}', '${order.size2}'
    //     , '${order.name3}', '${order.type3}', '${order.size3}'
    //     , '${order.name4}', '${order.type4}', '${order.size4}'
    //     , '${order.sc_name}', '${order.sd_manager}', '${order.pricing}', '${order.quaterly}'
    //     , '${order.yearly}'
    //     )`
    // }
    //console.log(sql);

    const result = await db.query(
        `INSERT INTO orders('order_type', 'service_id', 'network_id', 'product_type' 
            , 'customer', 'customer_id', 'quantity', 'others'
            , 'remark', 'wiring', 'app_date', 'ae_name'
            , 'staff_id', 'pm_name', 'tid_manager', 'ae_no'
            , 'cost_center', 'form_status', 'form_remark', 'sector'
            , 'sfdc_id', 'vertical', 'hqstate', 'contract_no'
            , 'scope', 'submission_category', 'po_date', 'project_single'
            , 'sitename', 'contact_no', 'assign_by'
            , 'name', 'type', 'size'
            , 'name2', 'type2', 'size2'
            , 'name3', 'type3', 'size3'
            , 'name4', 'type4', 'size4'
            , 'sc_name', 'sd_manager', 'pricing', 'quaterly'
            , 'yearly'
            ) VALUES ('${order.order_type}', '${order.service_id}', '${order.network_id}', '${order.product_type}'
            , '${order.customer}', '${order.customer_id}', '${order.quantity}', '${order.others}'
            , '${order.remark}', '${order.wiring}', '${order.app_date}', '${order.ae_name}'
            , '${order.staff_id}', '${order.pm_name}', '${order.tid_manager}', '${order.ae_no}'
            , '${order.cost_center}', '${order.form_status}', '${order.form_remark}', '${order.sector}'
            , '${order.sfdc_id}', '${order.vertical}', '${order.hqstate}', '${order.contract_no}'
            , '${order.scope}', '${order.submission_category}', '${order.po_date}', '${order.project_single}'
            , '${order.sitename}', '${order.contact_no}', '${order.assign_by}'
            , '${order.name}', '${order.type}', '${order.size}'
            , '${order.name2}', '${order.type2}', '${order.size2}'
            , '${order.name3}', '${order.type3}', '${order.size3}'
            , '${order.name4}', '${order.type4}', '${order.size4}'
            , '${order.sc_name}', '${order.sd_manager}', '${order.pricing}', '${order.quaterly}'
            , '${order.yearly}'
            )`
    );
    console.log(result);
    let message = error.RECORD_ERROR;
    if(!result && result.length != 0){
        message = error.RECORD_CREATED;
    }
    return {message};
}



async function update(id, order){
    const result = await db.query(
        ``
    );
    let message = error.RECORD_ERROR;
    if(!result && result.length != 0){
        message = error.RECORD_UPDATED;
    }
    return {message};
}

async function remove(id){
    const result = await db.query(
        ``
    );
    let message = error.RECORD_ERROR;
    if(!result && result.length != 0){
        message = error.RECORD_DELETED;
    }
    return {message};
    
}

module.exports = {
    getMultiple,
    create,
    update,
    remove
}

