const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const error = require('../shared/error');

async function find(){
    const rows = await db.query(
        `SELECT * 
        FROM cdy`
    );
    return rows;
}

async function findById(id){
    const rows = await db.query(
        `SELECT * FROM cdy where id='${id}'`
    );
    if(rows.length!=0){
        return rows[0];
    }
    return error.RECORD_EMPTY;
}

async function findByIdAndUpdate(id, cdy){
    let sql =`UPDATE cdy SET 
            name='${cdy.name}' WHERE id='${id}'`
    
    const result = await db.query(sql)
    let message = error.RECORD_ERROR;

    if(result.affectedRows){
        message = error.RECORD_UPDATED;
    }
    return {message}
}

async function create(cdy){
    const result = await db.query(
        `INSERT INTO cdy(name) 
        VALUES ('${cdy.name}')`
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
