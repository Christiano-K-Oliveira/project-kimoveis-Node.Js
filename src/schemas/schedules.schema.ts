import { z } from 'zod'
import { realEstateResultSchema } from '../schemas/realEstate.schema'

const scheduleSchema = z.object({
    id: z.number(),
    date: z.string(),
    hour: z.string()
})

const manySchedulesSchema = scheduleSchema.array()

const returnSchedulesByRealEstateSchema = realEstateResultSchema.extend({
    createdAt: z.string(),
    updatedAt: z.string(),
    schedule: manySchedulesSchema,
    address: z.object({
        id: z.number(),
        city: z.string(),
        street: z.string(),
        state: z.string(),
        zipCode: z.string(),
        number: z.string().nullable()
    }),
    category: z.object({
        id: z.number(),
        name: z.string()
    })
})

const createScheduleRequestSchema = z.object({
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number().int(),
})

const createScheduleRequestWidthUserId = createScheduleRequestSchema.extend({
    userId: z.number()
})

const createScheduleResultSchema = z.object({
    id: z.number()
}).extend({
    createScheduleRequestSchema,
    userId: z.number()
})

export { returnSchedulesByRealEstateSchema, createScheduleRequestSchema, createScheduleResultSchema, createScheduleRequestWidthUserId }