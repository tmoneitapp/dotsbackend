const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const error = require('../shared/error');

async function find(query){
    let sql='';
    if(query.name){
        sql = `SELECT * FROM roles WHERE name='${query.name}'`
    }
    else{
        sql = `SELECT * FROM roles`
    }
    const rows = await db.query(sql)
    return rows;
}

async function findById(id){
    const rows = await db.query(
        `SELECT * FROM roles WHERE uuid='${id}'`
    );
    if(rows.length!=0){
        return rows[0];
    }
    return error.RECORD_EMPTY;
}

async function findByIdAndUpdate(id, role){
    let sql = 'UPDATE roles SET ';
    let sqlvalue ='';

    if(role.name){
        if(sqlvalue!='') sqlvalue+=','
        sqlvalue += `name='${role.name}'`
    }
    if(role.description){
        if(sqlvalue!='') sqlvalue+=','
        sqlvalue += `description='${role.description}'`
    }
    if(role.authority){
        if(sqlvalue!='') sqlvalue+=','
        sqlvalue += `authority='${role.authority}'`
    }
    sql += sqlvalue + ` WHERE uuid='${id}'`

    let message = error.RECORD_ERROR;
    const result = await db.query(sql)
    if(result.affectedRows){
        const rows = await db.query(`SELECT * FROM roles WHERE uuid='${id}'`)
        return rows[0];
    }
    return {message}
}

async function findByIdAndRemove(id){
    const result = await db.query(
        `DELETE FROM roles WHERE uuid='${id}'`
    );
    let message = error.RECORD_ERROR;
    if(result.affectedRows){
        message = error.RECORD_DELETED;
    }
    return {message}
}

async function create(role){
    let sql = `INSERT INTO roles(uuid, name, description, authority) 
            VALUES(uuid(), '${role.name}','${role.description}','${role.authority}')`

    let message = error.RECORD_ERROR;
    try {
        const result = await db.query(sql)

        if(result.affectedRows){
            const rows = await db.query(`SELECT * FROM roles WHERE id='${result.insertId}'`)
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