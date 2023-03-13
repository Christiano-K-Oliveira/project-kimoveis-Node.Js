import { Router } from 'express'
import { createRealEstateController } from '../controllers/realEstate.controllers'
import checkIsAdmin from '../middlewares/checkIsAdmin.middleware'
import checkTokenMiddleware from '../middlewares/checkToken.middleware'
import validateData from '../middlewares/validateData.middleware'
import { realEstateSchema } from '../schemas/realEstate.schema'

const realEstateRoutes: Router = Router()

realEstateRoutes.post('', checkTokenMiddleware, checkIsAdmin, validateData(realEstateSchema), createRealEstateController)

export default realEstateRoutes