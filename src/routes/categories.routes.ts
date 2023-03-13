import { Router } from 'express'
import { createCategoryController, listCategoriesController, listRealEstateByCategoryController } from '../controllers/categories.controllers'
import checkIsAdmin from '../middlewares/checkIsAdmin.middleware'
import checkTokenMiddleware from '../middlewares/checkToken.middleware'
import validateData from '../middlewares/validateData.middleware'
import { createCategorySchema } from '../schemas/categories.schema'

const categoriesRoutes: Router = Router()

categoriesRoutes.post('', checkTokenMiddleware, checkIsAdmin, validateData(createCategorySchema), createCategoryController)
categoriesRoutes.get('', listCategoriesController)
categoriesRoutes.get('/:id/realEstate', listRealEstateByCategoryController)

export default categoriesRoutes