import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import { AppError } from '../../errors'
import { iCategory, iCategoryResult } from '../../interfaces/categories.interfaces'

const createCategoryService = async (categoryData: iCategory): Promise<iCategoryResult> => {
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)
    const categoryFind: boolean = await categoryRepository.exist({ where: {
        name: categoryData.name
    }})

    if(categoryFind){
        throw new AppError('Category already exists', 409)
    }

    const category = categoryRepository.create(categoryData)
    await categoryRepository.save(category)

    return category
}

export default createCategoryService