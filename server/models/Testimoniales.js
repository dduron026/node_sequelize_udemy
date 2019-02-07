const Sequelize = require('sequelize');

const db = require('../config/database');

const Testimonial = db.define('testimoniales', { //'testimoniales' es el nombre de la tabla de la BD
    nombre: {
        type: Sequelize.STRING
    },
    correo: {
        type: Sequelize.STRING
    },
    mensaje: {
        type: Sequelize.STRING
    }
})

module.exports = Testimonial;