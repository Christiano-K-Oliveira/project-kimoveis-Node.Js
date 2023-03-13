import { nullable, z } from 'zod'

const idKey = z.object({
    id: z.number()
})

const addressSchema = z.object({
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().optional(),
    city: z.string().max(20),
    state: z.string().max(2)
})

const realEstateSchema = z.object({
    value: z.number(),
    size: z.number().int(),
    categoryId: z.number().optional(),
    sold: z.boolean().default(false)
})

const realEstateRequestSchema = z.object({
    value: z.number(),
    size: z.number().int(),
    sold: z.boolean().default(false),
    address: addressSchema,
    categoryId: z.number()
})

const realEstateResultSchema = idKey.merge(realEstateRequestSchema)


export { realEstateSchema, addressSchema, realEstateResultSchema, realEstateRequestSchema }