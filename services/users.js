const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const error = require('../shared/error');
const crypto = require('crypto');

async function getMultiple(){
    const rows = await db.query(
        `SELECT id, name, username, email, userlevel, sektor, cost, 
        mobile_no, del_no, staff_id, entgov, funct, timestamp
        FROM users`
    );
    return rows;
}

async function findByUserId(userid){
    console.log(`findByUserId: ${userid}`);
    
    const rows = await db.query(
        `SELECT id, name, username, email, userlevel, sektor, cost, 
        mobile_no, del_no, staff_id, entgov, funct, timestamp, userid
        FROM users 
        WHERE userid = '${userid}' limit 1; `
    );
    if(rows.length != 0){
        return rows[0];
    }
    else{
        return error.RECORD_EMPTY;
    }
}

async function getLogin(username, password){
    const rows = await db.query(
        `SELECT id, name, username, email, userlevel, sektor, cost, 
        mobile_no, del_no, staff_id, entgov, funct, timestamp, password, userid
        FROM users 
        WHERE username = '${username}' limit 1; `
    );
    // console.log(
    //     `SELECT id, name, username, email, userlevel, sektor, cost, 
    //     mobile_no, del_no, staff_id, entgov, funct, timestamp, password 
    //     FROM users 
    //     WHERE username = '${username}' limit 1;`
    // );
    // console.log(rows);
    if(rows.length != 0){
        let password_hash = crypto.createHash('md5').update(password).digest('hex');
        // console.log(password_hash);
        // console.log(rows[0].password);
        if(rows[0].password === password_hash){
            return rows;
        }
        else{
            return error.USER_INVALID_PASSWORD;
        }
    }
    return error.USER_INVALID_USERNAME;
}

async function create(user){
    const result = await db.query(
        `INSERT INTO users
        ()
        VALUES
        ()`
    );
    let message = 'Error in creating user';
    if (result.affectedRows){
        message = 'User created successfully';
    }
}

async function findByIdAndUpdate(id, user){
    let sql = 'UPDATE users SET ';
    let sqlvalue = '';

    if(user.cost){
        if (sqlvalue !='') sqlvalue+=','
        sqlvalue += `cost = '${user.cost}'`
    }

    if(user.del_no){
        if(sqlvalue !='') sqlvalue+=','
        sqlvalue += `del_no ='${user.del_no}'`
    }

    if(user.email){
        if(sqlvalue !='') sqlvalue+=','
        sqlvalue += `email='${user.email}'`
    }

    if(user.entgov){
        if(sqlvalue !='') sqlvalue+=','
        sqlvalue += `entgov='${user.entgov}'`
    }

    if(user.funct){
        if(sqlvalue !='') sqlvalue+=','
        sqlvalue += `funct='${user.funct}'`
    }

    if(user.mobile_no){
        if(sqlvalue !='') sqlvalue+=','
        sqlvalue += `mobile_no='${user.mobile_no}'`
    }
    
    if(user.name){
        if(sqlvalue!='') sqlvalue+=','
        sqlvalue += `name='${user.name}'`
    }

    if(user.sektor){
        if(sqlvalue!='') sqlvalue+=','
        sqlvalue += `sektor='${user.sektor}'`
    }

    if(user.staff_id){
        if(sqlvalue!='') sqlvalue+=','
        sqlvalue += `staff_id='${user.staff_id}'`
    }

    if(user.username){
        if(sqlvalue!='') sqlvalue+=','
        sqlvalue += `username='${user.username}'`
    }

    sql += sqlvalue + ` WHERE userid = '${id}'`

    console.log(sql);

    const result = await db.query(
        sql
    );
    let message = 'Error in updating user';
    if (result.affectedRows){
        message = 'User updated successfully';
    }
    return {message};
}

async function remove(id){
    const result = await db.query(
        `DELETE FROM user WHERE id = ${id}`
    );
    let message = 'Error in deleting user';
    if(result.affectedRows){
        message = 'User deleted successfully';
    }
    return {message};
}


module.exports = {
    getMultiple,
    getLogin,
    findByUserId,
    create,
    findByIdAndUpdate,
    remove
}

/* TODO: Improve
find
findOne
findById
findByIdAndUpdate
findByIdAndRemove
*/