import { z } from 'zod'

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
    value: z.number().or(z.string()),
    size: z.number().int(),
    categoryId: z.number().optional(),
    sold: z.boolean().default(false)
})

const realEstateRequestSchema = z.object({
    sold: z.boolean().default(false),
    value: z.number().or(z.string()),
    size: z.number().int(),
    categoryId: z.number(),
    address: idKey.merge(addressSchema)
})

const realEstateResultSchema = idKey.merge(realEstateRequestSchema).extend({
    createdAt: z.string(),
    updatedAt: z.string()
})

const returnListRealEstatesSchema = realEstateResultSchema.extend({
    sold: z.boolean()
}).omit({
    categoryId: true
}).array()


export { realEstateSchema, addressSchema, realEstateResultSchema, realEstateRequestSchema, returnListRealEstatesSchema }