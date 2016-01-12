var sql = require('mysql');
var _   = require('lodash');
var crypto = require('crypto');

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
Authenticate user
*/
function authUser(username, password, callback) {

	var passwordHash = hash(password);

	conn.query(
		'select user_id, user_joined, user_name, user_details \
		from users where user_name = ? and password_hash = ?', 
		[username, passwordHash], 
		callback
	);
}

/* 
Create a new session for the authenticated user 
*/
function createSession(callback) {
	conn.query('insert into session set ?', {
        
    });
}

/* 
Public API 
*/
module.exports = {

}