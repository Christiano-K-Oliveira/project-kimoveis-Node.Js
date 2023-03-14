import { Router } from 'express'
import checkTokenMiddleware from '../middlewares/checkToken.middleware'
import { listSchedulesInRealEstateController } from '../controllers/schedules.controllers'
import checkIsAdmin from '../middlewares/checkIsAdmin.middleware'

const schedulesRoutes: Router = Router()

schedulesRoutes.post('',)
schedulesRoutes.get('/realEstate/:id', checkTokenMiddleware, checkIsAdmin, listSchedulesInRealEstateController)

export default schedulesRoutes

