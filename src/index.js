const fs = require('fs');
const https = require('https');
const express = require('express');
const config = require('../env/config');
const app = express();

//defino los middlewares
//cuando el cliente me envíe un objeto json, la API lo entenderá y lo convertirá a javascript
//que es el tipo del fichero que estoy construyendo
app.use(express.json());

//me puede enviar un dato en forma de formulario
//lo de extended es para decirle que tb puedo recibir imagenes y tal
app.use(express.urlencoded({extended: true}));

//rutas
app.use(require('./routes/index'));

app.get('/db', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM test_table');
    const results = { 'results': (result) ? result.rows : null};
    res.render('pages/db', results );
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})

app.listen(config.PORT);
console.log('Server on port ' + config.PORT);

/*https.createServer({
    key: fs.readFileSync('my_cert.key'),
    cert: fs.readFileSync('my_cert.crt')
  }, app).listen(config.PORT, function(){
    console.log("My HTTPS server listening on port " + config.PORT + "...");
  });*/
