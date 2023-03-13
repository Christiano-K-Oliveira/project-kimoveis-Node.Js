import { z } from 'zod'
import { createCategorySchema, returnCreateCategorySchema, returnListRealEstateByCategorySchema } from '../schemas/categories.schema'

type iCategory = z.infer<typeof createCategorySchema>
type iCategoryResult = z.infer<typeof returnCreateCategorySchema>
type iReturnRealEstateByCategory = z.infer<typeof returnListRealEstateByCategorySchema>

export { iCategory, iCategoryResult, iReturnRealEstateByCategory }