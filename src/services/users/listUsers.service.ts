import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities/index'
import { iListUserReturn } from '../../interfaces/users.interfaces'
import { resultGetUsersSchema } from '../../schemas/users.schema'

const listUsersService = async (): Promise<iListUserReturn>  => {
    const usersRepository: Repository<User> = AppDataSource.getRepository(User)
    const users: Array<User> = await usersRepository.find()
    const returnUsers: iListUserReturn = resultGetUsersSchema.parse(users)

    return returnUsers
}

export default listUsersService