const express = require('express');

const router = express.Router();

const Viaje = require('../models/Viajes');

module.exports = () => {

    router.get('/', (req, res) => {
        res.render('index');
    });

    router.get('/nosotros', (req, res) => {

        res.render('nosotros', {
            pagina: 'Sobre Nosotros'
        });
    });

    router.get('/viajes/:id', (req, res) => {

        Viaje.findById(req.params.id)
            .then(viaje => res.render('viaje', {
                viaje
            }))
            .catch(error => console.log(error));


    });

    router.get('/viajes', (req, res) => {

        Viaje.findAll()
            .then(function (viajes) {
                res.render('viajes', {
                    pagina: 'proximos viajes',
                    viajes: viajes
                })
            })
            .catch(error => console.log(error));

    });

    router.get('/testimoniales', (req, res) => {

        res.render('testimoniales', {
            pagina: 'testimoniales'
        });
    });

    return router;
}