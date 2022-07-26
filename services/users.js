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
    console.log('findByUserId: ');
    console.log(userid);
    
    const rows = await db.query(
        `SELECT id, name, username, email, userlevel, sektor, cost, 
        mobile_no, del_no, staff_id, entgov, funct, timestamp, userid
        FROM users 
        WHERE userid = '${userid}' limit 1; `
    );
    if(rows.length != 0){
        return rows;
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

async function update(id, user){
    const result = await db.query(
        `UPDATE user
        SET 
        WHERE id=${id}`
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
    update,
    remove
}

/* TODO: Improve
find
findOne
findById
findByIdAndUpdate
findByIdAndRemove
*/