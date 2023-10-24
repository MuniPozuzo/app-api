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
       encrypt: false,
     }
 }


// Iniciar el servidor
app.listen(3001, () => {
  console.log('Servidor Node.js en funcionamiento en el puerto 3001');
  console.log('Conexión establecida correctamente');
 });
 

 app.use(bodyParser.json());
 app.use(express.json());
// Configuración del middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));





app.post('/guardarImagen', async (req, res) => {
  try {
    const { nombre, base64Image } = req.body;
    const pool = await mssql.connect(config);

    const query = `
      INSERT INTO Imagenes (Nombre, ImagenBase64)
      VALUES (@nombre, @base64Image)
    `;

    const result = await pool.request()
      .input('nombre', mssql.NVarChar, nombre)
      .input('base64Image', mssql.NVarChar, base64Image)
      .query(query);

    res.status(200).send('Imagen guardada correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar la imagen');
  }
});









app.post('/guardar-datos', async (req, res) => {
 const datos = req.body; // Los datos enviados desde el formulario en la aplicación Flutter

 try {
   // Crear una nueva conexión a SQL Server
   const pool = await sql.connect(config);

   // Realizar la consulta de inserción
/*     const query = `INSERT INTO dbo.usuariop (Nombre, Apellido, Edad, Email) VALUES ('${datos.nombre}', '${datos.apellido}', ${datos.edad}, '${datos.email}')`; */
   const query = `INSERT INTO dbo.Registro(nombre) VALUES 
   ( '${datos.nombre}')`;
   await pool.request().query(query);

   // Cerrar la conexión
   await pool.close();

   res.send('Datos guardados exitosamente');
   
 } catch (error) {
   console.log('Error al guardar los datos:', error);
   res.status(500).send('Error al guardar los datos');
 }
});





