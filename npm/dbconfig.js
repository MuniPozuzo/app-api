const sql = require('mssql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


 const  config = {
     server: "DESKTOP-MFM5E12",
     authentication: {
         type: "default",
         options: {
             userName: "sa",
             password: "Kmzwa8awaa"
         }
     },
     options: {
         port: 1433,
         database: "Proyecto2",
         trustServerCertificate: true,
         validateBulkLoadParameters:false,
         instancename :'SQLEXPRESS',
         encrypt: false,
     }
 }

// Conectar a la base de datos
  sql.connect( config)
  .then(pool => {
    console.log('Conexión establecida correctamente');

    // Ejecutar una consulta
    return pool.request()
      .query('SELECT * FROM dbo.compute_node')
  })
  .then(result => {
    console.log(result.recordset);
  })
  .catch(err => {
    console.error('Error al conectar o ejecutar la consulta:', err);
    console.log(err)
  }); 

 
 


 module.exports = config; 