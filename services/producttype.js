const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const error = require('../shared/error');

async function find(){
    const rows = await db.query(
        `SELECT * 
        FROM product_type
        `
    );
    return rows;
}

async function findById(id){
    const rows = await db.query(
        `SELECT * FROM product_type where id='${id}'`
    );
    if(rows.length!=0){
        return rows[0];
    }
    return error.RECORD_EMPTY;
}

async function findByIdAndUpdate(id, producttype){
    let sql = `UPDATE product_type SET 
            name='${producttype.name}' WHERE id='${id}'`
    
            const result = await db.query(sql)
    let message = error.RECORD_ERROR;
    
    if(result.affectedRows){
        message = error.RECORD_UPDATED;
    }
    return {message}
}

async function create(producttype){
    const result = await db.query(
        `INSERT INTO product_type(name)
        VALUES('${producttype.name}')`
    );
    let message = error.RECORD_ERROR;
    if(result.affectedRows){
        message = error.RECORD_CREATED;
    }
    return {message}
}

module.exports = {
    create, 
    find, 
    findById,
    findByIdAndUpdate
}
