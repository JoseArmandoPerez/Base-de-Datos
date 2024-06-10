const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: '10.10.11.123',
  port: '3306',
  user: 'usuario1',
  password: 'usuario1',
  database: 'Tienda'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Servir los archivos estáticos de la aplicación Ionic
app.use(express.static(path.join(__dirname, 'www')));

app.get('/api/datos/:tabla', (req, res) => {
  const tabla = req.params.tabla;
  connection.query(`SELECT * FROM ${tabla}`, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'www/index.html'));
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
