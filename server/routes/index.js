const express = require('express');

const router = express.Router();

const Viaje = require('../models/Viajes');

const Testimonial = require('../models/Testimoniales');



module.exports = () => {

    router.get('/', (req, res) => {

        //varias consultas a la vez a la BD y mostrarlas en la vista
        const promises = [];

        promises.push(Viaje.findAll({
            limit: 3
        }))

        promises.push(Testimonial.findAll({
            limit: 3
        }))

        //pasar el promise y ejecutarlo
        const resultado = Promise.all(promises);

        resultado.then(resultado => {
                res.render('index', {
                    pagina: 'proximos viajes',
                    clase: 'home',
                    viajes: resultado[0],
                    testimoniales: resultado[1]
                })
            })
            .catch(error => console.log(error));

    });

    router.get('/nosotros', (req, res) => {

        res.render('nosotros', {
            pagina: 'Sobre Nosotros'
        });
    });

    router.get('/viajes/:id', (req, res) => {

        Viaje.findByPk(req.params.id)
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

        Testimonial.findAll()
            .then(testimoniales => res.render('testimoniales', {
                pagina: 'testimoniales',
                testimoniales
            }))
    });

    //para guardar el formulario
    router.post('/testimoniales', (req, res) => {

        // console.log(req.body);

        //validar que los campos esten llenos

        let {
            nombre,
            correo,
            mensaje
        } = req.body;

        //arreglo de errores en caso q alguien deje los campos vacíos
        let errores = [];

        if (!nombre) {
            errores.push({
                'mensaje': 'falta el nombre'
            })
        }
        if (!correo) {
            errores.push({
                'mensaje': 'falta el correo'
            })
        }
        if (!mensaje) {
            errores.push({
                'mensaje': 'falta el mensaje'
            })
        }

        //revisar por errores
        if (errores.length > 0) {
            //muestra la vista con errores
            res.render('testimoniales', {
                errores,
                nombre,
                correo,
                mensaje
            })

        } else {
            //guarda el formulario en la base de datos
            Testimonial.create({
                    nombre,
                    correo,
                    mensaje
                })
                .then(testimonial => res.redirect('/testimoniales'))
                .catch(error => console.log(error))
        }



    });

    return router;

}