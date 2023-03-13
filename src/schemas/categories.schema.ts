import { z } from 'zod'

const idKey = z.object({
    id: z.number()
})

const createCategorySchema = z.object({
    name: z.string().max(45)
})

const returnCreateCategorySchema = idKey.merge(createCategorySchema)

const realEstateByCategory = z.object({
    id: z.number(),
    size: z.number(),
    sold: z.boolean().optional(),
    value: z.number().or(z.string()).optional(),
    createdAt: z.string(),
    updatedAt: z.string()
})

const returnListRealEstateByCategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    realEstate:  realEstateByCategory.array()
})

export { createCategorySchema, returnCreateCategorySchema, returnListRealEstateByCategorySchema }