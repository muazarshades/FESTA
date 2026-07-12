const db = require('../db');

const createUser = (data, callback) => {

    db.query(
        'INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)',
        data,
        callback
    );
};

module.exports = {
    createUser
};