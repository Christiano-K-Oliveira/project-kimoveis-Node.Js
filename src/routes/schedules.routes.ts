import { Router } from 'express'
import checkTokenMiddleware from '../middlewares/checkToken.middleware'
import { createScheduleController, listSchedulesInRealEstateController } from '../controllers/schedules.controllers'
import checkIsAdmin from '../middlewares/checkIsAdmin.middleware'
import validateData from '../middlewares/validateData.middleware'
import { createScheduleRequestSchema } from '../schemas/schedules.schema'

const schedulesRoutes: Router = Router()

schedulesRoutes.post('', checkTokenMiddleware, validateData(createScheduleRequestSchema), createScheduleController)
schedulesRoutes.get('/realEstate/:id', checkTokenMiddleware, checkIsAdmin, listSchedulesInRealEstateController)

export default schedulesRoutes

