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

async function findById(id){
    const rows = await db.query(
        `SELECT * 
        FROM orders 
        WHERE id = ${id}`
    );
    return rows;
}

async function create2(order){
    var files = order.files; 
    var order = order.body;

    console.log(files);
    if(files){
        if(files['file1']){
            order.name = files['file1'][0].originalname;
            order.type = files['file1'][0].mimetype;
            order.size = files['file1'][0].size;
            order.content = files['file1'][0].buffer.toString('base64');
        }
        if(files['file2']){
            order.name2 = files['file2'][0].originalname;
            order.type2 = files['file2'][0].mimetype;
            order.size2 = files['file2'][0].size;
            order.content2 = files['file2'][0].buffer.toString('base64');
        }
    }

    
    console.log(order);
    let sql =  `INSERT INTO orders(order_type, customer 
        , name, type, size, content
        , name2, type2, size2, content2
        ) VALUES ('${order.order_type}', '${order.customer}'
        , '${order.name}', '${order.type}', '${order.size}', '${order.content}'
        , '${order.name2}', '${order.type2}', '${order.size2}', '${order.content2}'
        )`;

    console.log(sql);
    
    const result = await db.query(
        sql
     );
     console.log(result);
     let message = error.RECORD_ERROR;
     if(result.affectedRows){
         message = error.RECORD_CREATED;
     }
     return {message};
  
    //     var fileSize = getFilesizeInBytes(temp_path);
    //     var buffer = new Buffer(fileSize);
    //     fs.read(fd, buffer, 0, fileSize, 0, function (err, num) {
    
    //         var query = "INSERT INTO files SET ?",
    //             values = {
    //                 file_type: 'img',
    //                 file_size: buffer.length,
    //                 file: buffer
    //             };
    //         mySQLconnection.query(query, values, function (er, da) {
    //             if(er)throw er;
  

}

async function create(order){
    var files = order.files;
    var order = order.body;

    if(files){
        if(files['file1']){
            order.name = files['file1'][0].originalname;
            order.type = files['file1'][0].mimetype;
            order.size = files['file1'][0].size;
            order.content = files['file1'][0].buffer.toString('base64');
        }
        if(files['file2']){
            order.name2 = files['file2'][0].originalname;
            order.type2 = files['file2'][0].mimetype;
            order.size2 = files['file2'][0].size;
            order.content2 = files['file2'][0].buffer.toString('base64');
        }
        if(files['file3']){
            order.name3 = files['file3'][0].originalname;
            order.type3 = files['file3'][0].mimetype;
            order.size3 = files['file3'][0].size;
            order.content3 = files['file3'][0].buffer.toString('base64');
        }
        if(files['file4']){
            order.name4 = files['file4'][0].originalname;
            order.type4 = files['file4'][0].mimetype;
            order.size4 = files['file4'][0].size;
            order.content4 = files['file4'][0].buffer.toString('base64');
        }
    }

    if(order.quantity === undefined) order.quantity=0;
    if(order.app_date === undefined) order.app_date=new Date();

    let sql =  `INSERT INTO orders(order_type, service_id, network_id, product_type 
            , customer, customer_id, quantity, others
            , remark, wiring, app_date, ae_name
            , staff_id, pm_name, tid_manager, ae_no
            , cost_center, form_status, form_remark, sector
            , sfdc_id, vertical, hqstate, contract_no
            , scope, submission_category, po_date, project_single
            , sitename, contact_no, assign_by
            , name, type, size, content
            , name2, type2, size2, content2
            , name3, type3, size3, content3
            , name4, type4, size4, content4
            , sc_name, sd_manager, pricing, quartely
            , yearly
            ) VALUES ('${order.order_type}', '${order.service_id}', '${order.network_id}', '${order.product_type}'
            , '${order.customer}', '${order.customer_id}', '${order.quantity}', '${order.others}'
            , '${order.remark}', '${order.wiring}', '${order.app_date}', '${order.ae_name}'
            , '${order.staff_id}', '${order.pm_name}', '${order.tid_manager}', '${order.ae_no}'
            , '${order.cost_center}', '${order.form_status}', '${order.form_remark}', '${order.sector}'
            , '${order.sfdc_id}', '${order.vertical}', '${order.hqstate}', '${order.contract_no}'
            , '${order.scope}', '${order.submission_category}', '${order.po_date}', '${order.project_single}'
            , '${order.sitename}', '${order.contact_no}', '${order.assign_by}'
            , '${order.name}', '${order.type}', '${order.size}', '${order.content}'
            , '${order.name2}', '${order.type2}', '${order.size2}', '${order.content2}'
            , '${order.name3}', '${order.type3}', '${order.size3}', '${order.content3}'
            , '${order.name4}', '${order.type4}', '${order.size4}', '${order.content4}'
            , '${order.sc_name}', '${order.sd_manager}', '${order.pricing}', '${order.quartely}'
            , '${order.yearly}'
            )`;
    //console.log(sql);

    const result = await db.query(
       sql
    );
    console.log(result);
    let message = error.RECORD_ERROR;
    if(result.affectedRows){
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
    findById,
    create,
    create2,
    update,
    remove
}

