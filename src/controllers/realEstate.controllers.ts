import { Request, Response } from 'express'
import { iRealEstate } from '../interfaces/realEstate.interfaces'
import createRealStateService from '../services/realState/createRealState.service'
import listRealEstatesService from '../services/realState/listRealEstates.service'

const listRealEstatesController = async (req: Request, res: Response): Promise<Response> => {
    const listRealEstates = await listRealEstatesService()

    return res.status(200).json(listRealEstates)
}

const createRealEstateController = async (req: Request, res: Response): Promise<Response> => {
    const realEstateData: iRealEstate= req.body

    const newRealEstate = await createRealStateService(realEstateData)

    return res.status(201).json(newRealEstate)
}

export { createRealEstateController, listRealEstatesController }