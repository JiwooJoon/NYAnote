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
                "db ������ ������ �߻��Ͽ����ϴ�."
                + err);
            else console.log("db���� ����!");
        })
    }
}