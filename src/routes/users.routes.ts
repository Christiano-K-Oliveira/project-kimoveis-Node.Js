import { Router } from 'express'
import { createUserController, deleteUserController, listUsersController, updateUserController } from '../controllers/users.controllers'
import checkIsAdmin from '../middlewares/checkIsAdmin.middleware'
import checkTokenMiddleware from '../middlewares/checkToken.middleware'
import checkUserExists from '../middlewares/checkUserExists.middleware'
import validateData from '../middlewares/validateData.middleware'
import { updateUserSchema, userSchema } from '../schemas/users.schema'

const usersRoutes: Router = Router()

usersRoutes.get('', checkTokenMiddleware, checkIsAdmin, listUsersController)
usersRoutes.post('', validateData(userSchema), createUserController)
usersRoutes.patch('/:id', checkTokenMiddleware, validateData(updateUserSchema), updateUserController)
usersRoutes.delete('/:id', checkTokenMiddleware, checkUserExists, checkIsAdmin, deleteUserController)


export default usersRoutes