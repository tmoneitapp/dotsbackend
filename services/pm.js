const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const error = require('../shared/error');

async function find(){
    const rows = await db.query(
        `SELECT * 
        FROM project_manager
        `
    );
    return rows;
}

async function findById(id){
    const rows = await db.query(
        `SELECT * FROM project_manager where id='${id}'`
    );
    if(rows.length!=0){
        return rows[0];
    }
    return error.RECORD_EMPTY;
}

async function findByIdAndUpdate(id, pm){
    let sql = `UPDATE project_manager SET 
            name='${pm.name}' WHERE id='${id}'`
    
    const result = await db.query(sql)
    let message = error.RECORD_ERROR;

    if(result.affectedRows){
        message = error.RECORD_UPDATED;
    }
    return {message}
}

async function create(pm){
    const result = await db.query(
        `INSERT INTO project_manager(name) 
        VALUES ('${pm.name}')`
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