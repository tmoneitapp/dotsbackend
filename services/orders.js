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
    const sql ='';

    for(var i= 0; i <= order.length -1; i++){
        if(i=0){

        }
        else{
            sql += ',';
        }
        sql = `('${order[i].order_type}', '${order[i].service_id}', '${order[i].network_id}', '${order[i].product_type}'
        , '${order[i].customer}', '${order[i].customer_id}', '${order[i].quantity}', '${order[i].others}'
        , '${order[i].remark}', '${order[i].wiring}', '${order[i].app_date}', '${order[i].ae_name}'
        , '${order[i].staff_id}', '${order[i].pm_name}', '${order[i].tid_manager}', '${order[i].ae_no}'
        , '${order[i].cost_center}', '${order[i].form_status}', '${order[i].form_remark}', '${order[i].sector}'
        , '${order[i].sfdc_id}', '${order[i].vertical}', '${order[i].hqstate}', '${order[i].contract_no}'
        , '${order[i].scope}', '${order[i].submission_category}', '${order[i].po_date}', '${order[i].project_single}'
        , '${order[i].sitename}', '${order[i].contact_no}', '${order[i].assign_by}'
        , '${order[i].name}', '${order[i].type}', '${order[i].size}', '${order[i].content}'
        , '${order[i].name2}', '${order[i].type2}', '${order[i].size2}', '${order[i].content2}'
        , '${order[i].name3}', '${order[i].type3}', '${order[i].size3}', '${order[i].content3}'
        , '${order[i].name4}', '${order[i].type4}', '${order[i].size4}', '${order[i].content4}'
        , '${order[i].sc_name}', '${order[i].sd_manager}', '${order[i].pricing}', '${order[i].quaterly}'
        , '${order[i].yearly}'
        )`
    }
    console.log(sql);

    const result = await db.query(
        `INSERT INTO orders('order_type', 'service_id', 'network_id', 'product_type' 
            , 'customer', 'customer_id', 'quantity', 'others'
            , 'remark', 'wiring', 'app_date', 'ae_name'
            , 'staff_id', 'pm_name', 'tid_manager', 'ae_no'
            , 'cost_center', 'form_status', 'form_remark', 'sector'
            , 'sfdc_id', 'vertical', 'hqstate', 'contract_no'
            , 'scope', 'submission_category', 'po_date', 'project_single'
            , 'sitename', 'contact_no', 'assign_by'
            , 'name', 'type', 'size', 'content'
            , 'name2', 'type2', 'size2', 'content2'
            , 'name3', 'type3', 'size3', 'content3'
            , 'name4', 'type4', 'size4', 'content4'
            , 'sc_name', 'sd_manager', 'pricing', 'quaterly'
            , 'yearly'
            ) VALUES ? `, sql
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

