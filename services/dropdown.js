const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const error = require('../shared/error');

async function find(query){
    let sql = '';
    if(query.type){
        sql = `SELECT * FROM dropdown WHERE type ='${query.type}'`
    }
    else {
        sql = `SELECT * FROM dropdown`
    }
    const rows = await db.query(
        sql
    )
    return rows;
}

async function create(dropdown){
    let sql = `INSERT INTO dropdown( type, value, display, disabled)
            VALUES( '${dropdown.type}','${dropdown.value}','${dropdown.display}',0)`
    const result = await db.query(sql)
    let message = error.RECORD_ERROR;
    
    if(result.affectedRows){
        const rows = await db.query(`SELECT * FROM dropdown where id = '${result.insertId}'`)
        return rows[0];
    }
    else{
        throw new error('Invalid operation');
    }
}

module.exports = {
    find,
    create
}