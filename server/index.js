//cargar express
const express = require('express');
const path = require('path');
const routes = require('./routes');
const configs = require('./config');
//configurar express
const app = express()




//habilitar pug
app.set('view engine', 'pug')

//añadir las vistas
app.set('views', path.join(__dirname, './views'));

//cargar la carpeta con los estaticos
app.use(express.static('public'));

//validar si estamos en desarrollo o en produccion
const config = configs[app.get('env')];

//crear la variable
app.locals.titulo = config.nombresitio;

//muestra el año actual
app.use((req, res, next) => {
    const fecha = new Date();

    res.locals.fechaActual = fecha.getFullYear();

    console.log(res.locals);

    return next();

});

//cargar rutas
app.use('/', routes());

app.listen(3000, () => console.log('escuchando puerto 3000'));