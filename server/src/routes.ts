import express from 'express'
import {celebrate, Joi} from 'celebrate'
import multer from 'multer'

import PointsController from './controllers/PointsControllers'
import ItemsControllers from './controllers/ItemsControllers'
import multerConfig from './config/multerConfig'

const routes = express.Router()

const uploads = multer(multerConfig)

const pointsController = new PointsController()
const itemsControllers = new ItemsControllers()

routes.get('/items',itemsControllers.index)
routes.get('/points/:id', pointsController.show)
routes.get('/points', pointsController.index)

routes.post(
    '/points',
    uploads.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required(),
            whatsapp: Joi.number().required,
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
        
    },{
        abortEarly: false
    }),
    pointsController.create
)
export default routes