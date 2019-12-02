const mysql = require('mysql2');
const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        database: "mydb",
        password: '',
        waitForConnections: true,
        connectionLimit: 10
    });



const DBPromiseQuery =(query, data) => new Promise((resolve, reject) =>
    pool.getConnection((err, connection)=>{
      if (!err) resolve(new Promise((resolve, reject)=>{
          connection.query(query, data, (err, result)=>{
              !err ? resolve(result): reject(err);
              connection.release();
          })
      }));
        reject(err)
    })
);


module.exports = DBPromiseQuery;