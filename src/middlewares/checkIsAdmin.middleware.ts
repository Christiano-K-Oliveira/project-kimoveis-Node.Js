import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors'

const checkIsAdmin = (req: Request, res: Response, next: NextFunction): void => {
    const isAdmin: boolean = req.user.admin

    if(!isAdmin){
        throw new AppError('Insufficient permission', 403)
    }

    next()
}

export default checkIsAdmin