import { Request, Response } from 'express'
import listUsersService from '../services/users/listUsers.service'
import deleteUserService from '../services/users/deleteUser.service'
import createUserService from '../services/users/createUser.service'
import { iListUserReturn, iUpdateUser, iUpdateUserReturn, iUser } from '../interfaces/users.interfaces'
import updateUserService from '../services/users/updateUser.service'


const createUserController = async (req: Request, res: Response): Promise<Response> => {
    const userData: iUser = req.body
    const newUser = await createUserService(userData)

    return res.status(201).json(newUser)
}

const listUsersController = async (req: Request, res: Response): Promise<Response> => {
    const getUsers: iListUserReturn = await listUsersService()

    return res.status(200).json(getUsers)
}

const updateUserController = async (req: Request, res: Response): Promise<Response> => {
    const idUser: number = parseInt(req.params.id)
    const userData: iUser = req.body
    const idToken: number = req.user.id

    const updateUser: iUpdateUserReturn = await updateUserService(idUser, userData, idToken)

    return res.status(200).json(updateUser)
}

const deleteUserController = async (req: Request, res: Response): Promise<Response> => {
    const userId: number = parseInt(req.params.id)
    await deleteUserService(userId)

    return res.status(204).send()
}

export { createUserController, deleteUserController, listUsersController, updateUserController }