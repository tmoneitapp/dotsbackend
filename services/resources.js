const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const error = require('../shared/error');

async function find(query){
    let sql='';
    if(query.group){
        sql =`SELECT * FROM resources WHERE group='${query.group}'`
    }
    else{
        sql =`SELECT * FROM resources`
    }
    const rows = await db.query(sql)
    return rows;
}

async function findById(id){
    const rows = await db.query(
        `SELECT * FROM resources WHERE uuid='${id}'`
    );
    if(rows.length!=0){
        return rows[0];
    }
    return error.RECORD_EMPTY;
}

async function findByIdAndUpdate(id, resources){
    let sql='UPDATE resources SET ';
    let sqlvalue ='';

    if(resources.user_id){
        if(sqlvalue!='') sqlvalue+=','
        sqlvalue += `user_id='${resources.user_id}'`
    }
    if(resources.group){
        if(sqlvalue!='') sqlvalue+=','
        sqlvalue += `group='${resources.group}'`
    }
    sql += sqlvalue + ` WHERE uuid='${id}'`

    let message = error.RECORD_ERROR;
    const result = await db.query(sql)
    if(result.affectedRows){
        const rows = await db.query(`SELECT * FROM resources WHERE id='${result.insertId}'`)
        return rows[0];
    }
    return {message}
}

async function findByIdAndRemove(id){
    const result = await db.query(
        `DELETE FROM resources WHERE uuid='${id}'`
    );
    let message = error.RECORD_ERROR;
    if(result.affectedRows){
        message = error.RECORD_DELETED;
    }
    return {message}
}

async function create(resources){
    let sql = `INSERT INTO resources(uuid, user_id, group)
            VALUES(uuid(), '${resources.user_id}','${resources.group}')`

    let message = error.RECORD_ERROR;
    try {
        const result = await db.query(sql)

        if(result.affectedRows){
            const rows = await db.query(`SELECT * FROM resources WHERE id='${result.insertId}'`)
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