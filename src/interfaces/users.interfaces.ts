import { z } from 'zod'
import { resultGetUsersSchema, resultUserSchema, returnUpdateUserSchema, updateUserSchema, userSchema } from '../schemas/users.schema'

type iUser = z.infer<typeof userSchema>
type iUserReturn = z.infer<typeof resultUserSchema>
type iListUserReturn = z.infer<typeof resultGetUsersSchema>
type iUpdateUser = z.infer<typeof updateUserSchema>
type iUpdateUserReturn = z.infer<typeof returnUpdateUserSchema>

export { iUser, iUserReturn, iListUserReturn, iUpdateUser, iUpdateUserReturn }