import { Repository } from 'typeorm'
import { User } from '../../entities/index'
import { AppDataSource } from '../../data-source'
import { AppError } from '../../errors'

const deleteUserService = async (idUser: number): Promise<void> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOne({ where: {
        id: idUser
    }})

    if(user?.deletedAt !== null && user?.deletedAt !== undefined){
        throw new AppError('User not found', 404)
    }

    await userRepository.softRemove(user!)
}

export default deleteUserService