import { Request, Response } from 'express'
import { iCategory, iCategoryResult } from '../interfaces/categories.interfaces'
import createCategoryService from '../services/categories/createCategory.service'
import listCategoriesService from '../services/categories/listCategories.service'
import listRealEstateByCategoryService from '../services/categories/listRealEstateByCategory.service'

const createCategoryController = async (req: Request, res: Response): Promise<Response> => {
    const categoryData: iCategory = req.body
    const newCategory: iCategoryResult = await createCategoryService(categoryData)

    return res.status(201).json(newCategory)
}

const listCategoriesController = async (req: Request, res: Response): Promise<Response> => {
    const listCategories = await listCategoriesService()

    return res.status(200).json(listCategories)
}


const listRealEstateByCategoryController = async (req: Request, res: Response): Promise<Response> => {
    const idCategory: number = parseInt(req.params.id)
    const categories = await listRealEstateByCategoryService(idCategory)

    return res.status(200).json(categories)
}

export { createCategoryController, listCategoriesController, listRealEstateByCategoryController }