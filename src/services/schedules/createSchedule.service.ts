import { Repository, SelectQueryBuilder } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { RealEstate, Schedule } from '../../entities'
import { AppError } from '../../errors'
import { iRequestCreateScheduleWidthUserId, iResultCreateSchedule } from '../../interfaces/schedules.interfaces'

const createScheduleService = async (scheduleData: iRequestCreateScheduleWidthUserId): Promise<iResultCreateSchedule | void> => {
    const scheduleRepository: Repository<Schedule> = AppDataSource.getRepository(Schedule)
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const scheduleQueryBuilder: SelectQueryBuilder<Schedule> = scheduleRepository.createQueryBuilder('schedule')

    const realEstateExist: RealEstate | null = await realEstateRepository.findOne({ where: { id: scheduleData.realEstateId } })
    const scheduleExistsInSeveralRealEstate = await scheduleQueryBuilder.select('schedule').where('schedule.realEstate != :realEstate', { realEstate: scheduleData.realEstateId })
    .andWhere('schedule.date = :date', { date: scheduleData.date })
    .andWhere('schedule.hour = :hour', { hour: scheduleData.hour }).getOne()
    const scheduleExists = await scheduleQueryBuilder.select('schedule').where('schedule.realEstate = :realEstate', { realEstate: scheduleData.realEstateId })
    .andWhere('schedule.date = :date', { date: scheduleData.date })
    .andWhere('schedule.hour = :hour', { hour: scheduleData.hour }).getOne()

    if(!realEstateExist){
        throw new AppError('RealEstate not found', 404)
    }
    if(scheduleExistsInSeveralRealEstate){
        throw new AppError('User schedule to this real estate at this date and time already exists', 409)
    }
    if(scheduleExists){
        throw new AppError('Schedule to this real estate at this date and time already exists', 409)
    }

}

export default createScheduleService