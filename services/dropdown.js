const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const error = require('../shared/error');

async function find(query){
    let sql = '';
    if(query.type != undefined){
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

async function findById(id){
    const rows = await db.query(
        `SELECT * FROM dropdown WHERE uuid='${id}'`
    );
    if(rows.length!=0){
        return rows[0];
    }
    return error.RECORD_EMPTY;
}

async function findByIdAndUpdate(id, dropdown){
    let sql ='UPDATE dropdown SET ';
    let sqlvalue ='';

    if(dropdown.type){
        if(sqlvalue!='') sqlvalue+=','
        sqlvalue += `type='${dropdown.type}'`
    }
    if(dropdown.value){
        if(sqlvalue!='') sqlvalue+=','
        sqlvalue += `value='${dropdown.value}'`
    }
    if(dropdown.display){
        if(sqlvalue!='') sqlvalue+=','
        sqlvalue += `display='${dropdown.display}'`
    }
    sql += sqlvalue + ` WHERE uuid='${id}'`
    
    let message = error.RECORD_ERROR;
    const result = await db.query(sql)
    if(result.affectedRows){
        const rows = await db.query(`SELECT * FROM dropdown where uuid = '${id}'`)
        return rows[0];
    }
    return {message}
}

async function findByIdAndRemove(id){
    const result = await db.query(
        `DELETE FROM dropdown WHERE uuid='${id}'`
    );
    let message = error.RECORD_ERROR;
    if(result.affectedRows){
        message = error.RECORD_DELETED;
    }
    return {message}
}

async function create(dropdown){
    let sql = `INSERT INTO dropdown(uuid, type, value, display, disabled)
            VALUES(uuid(), '${dropdown.type}','${dropdown.value}','${dropdown.display}',0)`
    
    let message = error.RECORD_ERROR;
    try {
        const result = await db.query(sql)
        
        if(result.affectedRows){
            const rows = await db.query(`SELECT * FROM dropdown where id = '${result.insertId}'`)
            return rows[0];
        }
        return {message}
    } catch (err) {
        console.log(err);
        return {message}
    }
    
}

module.exports = {
    find,
    findById,
    findByIdAndUpdate,
    findByIdAndRemove,
    create
}