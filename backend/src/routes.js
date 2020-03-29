const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const sessionController = require('./controllers/sessionController');
const victimController = require('./controllers/victimController');
const profileIncidentController = require('./controllers/profileController');
const incidentController = require('./controllers/incidentController');

const routes = express.Router();

routes.post('/sessions',  sessionController.create);

routes.get('/victims', victimController.index);

routes.post('/victims', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), victimController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),                                    
}), profileIncidentController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), incidentController.index);

routes.post('/incidents', incidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), incidentController.delete);

module.exports = routes;