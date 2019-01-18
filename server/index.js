//cargar express
const express = require('express');
const path = require('path');
const routes = require('./routes');

//configurar express
const app = express()


//cargar rutas
app.use('/', routes());

//habilitar pug
app.set('view engine', 'pug')

//añadir las vistas
app.set('views', path.join(__dirname, './views'));

app.listen(3000, () => console.log('server en puerto 3000'))