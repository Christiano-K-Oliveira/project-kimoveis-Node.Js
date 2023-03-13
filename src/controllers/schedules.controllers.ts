import { Request, Response } from 'express'
import  listSchedulesInRealEstateService from '../services/schedules/listSchedulesInRealEstate.service'

const listSchedulesInRealEstateController = async (req: Request, res: Response): Promise<Response> => {
    const idRealEstate: number = parseInt(req.params.id)
    const listSchedulesInRealEstate = await listSchedulesInRealEstateService(idRealEstate)

    return res.status(200).json(listSchedulesInRealEstate)
}

export { listSchedulesInRealEstateController }