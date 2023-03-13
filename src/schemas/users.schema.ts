import { z } from 'zod'

const idKey = z.object({
    id: z.number()
})

const userSchema = z.object({
    name: z.string().max(45),
    email: z.string().email().max(45),
    password: z.string().max(120),
    admin: z.boolean().default(false)
})

const resultUserSchema = idKey.merge(userSchema).omit({
    password: true,
}).extend({
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable()
})

const resultGetUsersSchema = resultUserSchema.array()

const updateUserSchema = z.object({
    name: z.string().max(45).optional(),
    email: z.string().email().max(45).optional(),
    password: z.string().max(120).optional()
})

const returnUpdateUserSchema = idKey.merge(userSchema).omit({
    password: true
}).extend({
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable()
})

export { userSchema, resultUserSchema, resultGetUsersSchema, updateUserSchema, returnUpdateUserSchema }