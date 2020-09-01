const mysql = require('mysql');
function dbhelp(sql, param, callback) {
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'shop'
    });
    conn.connect();
    conn.query(sql, param, callback);
    conn.end()
}
module.exports = {
    query: dbhelp
}