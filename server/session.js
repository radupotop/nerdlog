var sql = require('mysql');
var _   = require('lodash');
var crypto = require('crypto');
var moment = require('moment');

/* SQL connection */
var conn = sql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nerdlog'
});

conn.connect();

/*
Hash password with SHA256
*/
function hash(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

/*
Get user authentication details
*/
function getAuth(username, password, callback) {

    var passwordHash = hash(password);

    conn.query(
        'select * from users where user_name = ? and password_hash = ?', 
        [username, passwordHash], 
        callback
    );
}

/* 
Create a new session for the authenticated user.
The token is hash(hash(password))
*/
function createSession(username, password, callback) {

    getAuth(username, password, function(err, resp) {

        if(_.isEmpty(resp)) {
            throw new Error('Could not find any records');
        }

        conn.query(
        'insert into session set ?', {
            token: hash(resp[0].password_hash),
            user_id: resp[0].user_id,
            expires: moment().add(1, 'month').toDate()
        },
        callback);
    });

}

createSession('Radu P', '', function(){console.log(arguments)});

/* 
Public API 
*/
module.exports = {
    createSession: createSession
};
