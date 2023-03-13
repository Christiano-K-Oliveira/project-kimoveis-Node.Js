import { NextFunction, Request, Response } from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User } from '../entities'
import { AppError } from '../errors'

const checkUserExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    const idUser: number = parseInt(req.params.id)
    const user: User | null = await userRepository.findOne({
        where: {
            id: idUser
        }
    })

    if(!user){
        throw new AppError('User not found', 404)
    }

    return next()
}

export default checkUserExists