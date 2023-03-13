import { Router } from 'express'
import { createLoginController } from '../controllers/login.controllers'
import validateData from '../middlewares/validateData.middleware'
import { createLoginSchema } from '../schemas/login.schema'

const loginRoutes: Router = Router()

loginRoutes.post('', validateData(createLoginSchema), createLoginController)

export default loginRoutes