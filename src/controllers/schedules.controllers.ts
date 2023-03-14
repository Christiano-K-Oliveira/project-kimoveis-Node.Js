import { Request, Response } from 'express'
import { iRequestCreateSchedule, iRequestCreateScheduleWidthUserId, iResultCreateSchedule } from '../interfaces/schedules.interfaces'
import createScheduleService from '../services/schedules/createSchedule.service'
import  listSchedulesInRealEstateService from '../services/schedules/listSchedulesInRealEstate.service'

const listSchedulesInRealEstateController = async (req: Request, res: Response): Promise<Response> => {
    const idRealEstate: number = parseInt(req.params.id)
    const listSchedulesInRealEstate = await listSchedulesInRealEstateService(idRealEstate)

    return res.status(200).json(listSchedulesInRealEstate)
}

const createScheduleController = async (req: Request, res: Response): Promise<Response> => {
    const scheduleData: iRequestCreateSchedule = req.body
    const userId: number = req.user.id
    const scheduleRequest: iRequestCreateScheduleWidthUserId = {
        ...scheduleData,
        userId
    }
    const createSchedule: iResultCreateSchedule | any = await createScheduleService(scheduleRequest)

    return res.status(201).json(createSchedule)
}

export { listSchedulesInRealEstateController, createScheduleController }