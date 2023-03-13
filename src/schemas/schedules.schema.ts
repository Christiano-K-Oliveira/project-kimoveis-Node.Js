import { number, z } from 'zod'
import { realEstateResultSchema } from '../schemas/realEstate.schema'

const scheduleSchema = z.object({
    id: z.number(),
    date: z.string(),
    hour: z.string()
})

const manySchedulesSchema = scheduleSchema.array()

const returnSchedulesByRealEstateSchema = realEstateResultSchema.omit({
    address: true,
    categoryId: true
}).extend({
    address: z.object({
        city: z.string(),
        street: z.string(),
        state: z.string(),
        zipCode: z.string(),
        number: z.string().nullable()
    }),
    category: z.object({
        id: z.number(),
        name: z.string()
    }) ,
    schedule: manySchedulesSchema,
    createdAt: z.string(),
    updatedAt: z.string()
})

export { returnSchedulesByRealEstateSchema }