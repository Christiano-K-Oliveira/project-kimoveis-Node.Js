import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { AppError } from '../../errors'
import { iUpdateUserReturn, iUser } from '../../interfaces/users.interfaces'
import { returnUpdateUserSchema } from '../../schemas/users.schema'

const updateUserService = async (idUser: number, userData: iUser, idToken: number): Promise<iUpdateUserReturn> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    const userFind: User | null  = await userRepository.findOne({ where: {
        id: idUser
    }})

    if(!userFind){
        throw new AppError('User not found', 404)
    }
    if(idUser !== idToken){
        const userIdToken: User | null = await userRepository.findOne({ where: {
            id: idToken
        }})

        if(userIdToken?.admin === false){
            throw new AppError('Insufficient permission', 403)
        }
    }

    const user =  userRepository.create({
        ...userFind,
        ...userData
    })
    await userRepository.save(user)

    const updateUserResult: iUpdateUserReturn = returnUpdateUserSchema.parse(user)

    return updateUserResult
}

export default updateUserService