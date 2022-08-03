const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const error = require('../shared/error');

async function find(query){
    let sql ='';
    if(query.identifier){
        sql = `SELECT * FROM authority WHERE identifier like '%${query.identifier}%'`
    }
    else{
        sql = `SELECT * FROM authority`
    }
    const rows = await db.query(sql)
    return rows;
}

async function findById(id){
    const rows = await db.query(
        `SELECT * FROM authority WHERE uuid='${id}'`
    );
    if(rows.length!=0){
        return rows[0];
    }
    return error.RECORD_EMPTY;
}

async function findByIdAndUpdate(id, authority){
    let sql = 'UPDATE authority SET ';
    let sqlvalue ='';

    if(authority.identifier){
        if(sqlvalue!='') sqlvalue+=','
        sqlvalue += `identifier='${authority.identifier}'`
    }
    if(authority.description){
        if(sqlvalue!='') sqlvalue+=','
        sqlvalue += `description='${authority.description}'`
    }
    sql += sqlvalue + ` WHERE uuid='${id}'`

    let message = error.RECORD_ERROR;
    const result = await db.query(sql)
    if(result.affectedRows){
        const rows = await db.query(`SELECT * FROM authority WHERE uuid ='${id}'`)
        return rows[0];
    }
    return {message}
}

async function findByIdAndRemove(id){
    const result = await db.query(
        `DELETE FROM authority WHERE uuid='${id}'`
    );
    let message = error.RECORD_ERROR;
    if(result.affectedRows){
        message = error.RECORD_DELETED;
    }
    return {message}
}

async function create(authority){
    let sql = `INSERT INTO authority(uuid, identifier, description) 
            VALUES(uuid(), '${authority.identifier}','${authority.description}')`
    
    let message = error.RECORD_ERROR;
    try {
        const result = await db.query(sql)
        if(result.affectedRows){
            const rows = await db.query(`SELECT * FROM authority WHERE id='${result.insertId}'`)
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
