const mysql = require('mysql');

var info = {
    host: 'localhost',
    user: 'root',
    password: 'sk772211@@',
    database: 'memo'
};

module.exports = {
    init : function () {
        return mysql.createConnection(info);
    },
    connect : function (conn) {
        conn.connect(function (err){
            if (err) console.error(
                "db 연결중 에러가 발생하였습니다."
                + err);
            else console.log("db연결 성공!");
        })
    }
}