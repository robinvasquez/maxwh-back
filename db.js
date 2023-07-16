const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'b301de2c18c39e',
  password: 'd227a46a',
  database: 'heroku_b4c4da01c0bf7c0',
});

connection.connect((error) => {
  if (error) {
    console.error('Error al conectar con la base de datos:', error);
  } else {
    console.log('Conexión exitosa con la base de datos');
  }
});

module.exports = connection;
