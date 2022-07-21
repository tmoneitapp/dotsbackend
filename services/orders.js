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
    const result = await db.query(
        `INSERT INTO orders set ?`, order
    );
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

