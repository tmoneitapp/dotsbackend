const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const error = require('../shared/error');

async function find(){
    const rows = await db.query(
        `SELECT * 
        FROM order_type
        `
    );
    return rows;
}

async function findById(id){
    const rows = await db.query(
        `SELECT * FROM order_type where id='${id}'`
    );
    if(rows.length !=0){
        return rows[0];
    }
    return error.RECORD_EMPTY;
}

async function findByIdAndUpdate(id, ordertype){
    let sql = `UPDATE order_type SET 
            name='${ordertype.name}' WHERE id='${id}'`

    const result = await db.query(sql)
    let message = error.RECORD_ERROR;

    if(result.affectedRows){
        message = error.RECORD_UPDATED;
    }
    return {message}
}

async function create(ordertype){
    const result = await db.query(
        `INSERT INTO order_type(name) 
        VALUES ('${ordertype.name}')`
    );
    let message = error.RECORD_ERROR;
    if(result.affectedRows){
        message= error.RECORD_CREATED;
    }
    return {message}
}

module.exports = {
    create,
    find,
    findById,
    findByIdAndUpdate
}