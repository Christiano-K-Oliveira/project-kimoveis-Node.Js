import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Category, RealEstate } from '../../entities'
import { AppError } from '../../errors'
import { iReturnRealEstateByCategory } from '../../interfaces/categories.interfaces'

const listRealEstateByCategoryService = async (idCategory: number): Promise<iReturnRealEstateByCategory> => {
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const categoryFind: Category | null = await categoryRepository.findOne({ 
        where: { 
            id: idCategory
        },
        relations: {
            realEstate: true
        }
    })
 

    if(!categoryFind){
        throw new AppError('Category not found', 404)
    }

    return categoryFind
}

export default listRealEstateByCategoryService