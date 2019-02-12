//cargar express
const express = require('express');
const path = require('path');
const routes = require('./routes');
const configs = require('./config');
const db = require('./config/database');
const morgan = require('morgan');

const bodyParser = require('body-parser');

db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//configurar express
const app = express()


//middleware
app.use(morgan('dev')) //morgan muestra por consola, las peticiones hechas al server


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
    res.locals.ruta = req.path;

    // console.log(res.locals);

    return next();

});

//ejecutar body parser
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse application/json
app.use(bodyParser.json())

//cargar rutas
app.use('/', routes());

app.listen(3000, () => console.log('escuchando puerto 3000'));