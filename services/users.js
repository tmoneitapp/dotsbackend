const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const { authenticate } = require('passport');
const error = require('../shared/error');

async function getMultiple(){
    const rows = await db.query(
        `SELECT id, name, username, email, userlevel, sektor, cost, 
        mobile_no, del_no, staff_id, entgov, funct, timestamp
        FROM users`
    );
    return rows;
}

async function getLogin(username, password){
    const rows = await db.query(
        `SELECT id, name, username, email, userlevel, sektor, cost, 
        mobile_no, del_no, staff_id, entgov, funct, timestamp, password 
        FROM users 
        WHERE username = '${username}' limit 1; `
    );
    console.log(
        `SELECT id, name, username, email, userlevel, sektor, cost, 
        mobile_no, del_no, staff_id, entgov, funct, timestamp, password 
        FROM users 
        WHERE username = '${username}' limit 1;`
    );
    console.log(rows.affectedRows);
    if(rows.affectedRows){
        let password_hash = crypto.createHash('md5').update(password).digest('hex');
        console.log(password);
        console.log(password_hash);
        console.log(rows.password);
        if(rows.password === password_hash){
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
    create,
    update,
    remove
}