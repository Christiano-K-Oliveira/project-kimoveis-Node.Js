import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { AppError } from '../../errors'
import { iUser, iUserReturn } from '../../interfaces/users.interfaces'
import { resultUserSchema } from '../../schemas/users.schema'

const createUserService = async (userData: iUser): Promise<iUserReturn> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    const user: User = userRepository.create(userData)

    const checkEmailExists: boolean = await userRepository.exist({ where: { email: userData.email } })

    if(checkEmailExists){
        throw new AppError('Email already exists', 409)
    }
    
    await userRepository.save(user)

    const userReturn: iUserReturn = resultUserSchema.parse(user)

    return userReturn
}

export default createUserService