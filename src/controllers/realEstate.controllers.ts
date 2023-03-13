import { Request, Response } from 'express'
import { iRealEstate } from '../interfaces/realEstate.interfaces'
import createRealStateService from '../services/realState/createRealState.service'

const createRealEstateController = async (req: Request, res: Response): Promise<Response> => {
    const realEstateData: iRealEstate= req.body

    const newRealEstate = await createRealStateService(realEstateData)

    return res.status(201).json(newRealEstate)
}

export { createRealEstateController }