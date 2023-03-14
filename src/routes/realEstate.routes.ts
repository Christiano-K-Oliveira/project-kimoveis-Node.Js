import { Router } from 'express'
import { createRealEstateController, listRealEstatesController } from '../controllers/realEstate.controllers'
import checkIsAdmin from '../middlewares/checkIsAdmin.middleware'
import checkTokenMiddleware from '../middlewares/checkToken.middleware'
import validateData from '../middlewares/validateData.middleware'
import { realEstateRequestSchema } from '../schemas/realEstate.schema'

const realEstateRoutes: Router = Router()

realEstateRoutes.post('', checkTokenMiddleware, checkIsAdmin, validateData(realEstateRequestSchema), createRealEstateController)
realEstateRoutes.get('', listRealEstatesController)

export default realEstateRoutes