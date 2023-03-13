import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { RealEstate, Schedule } from '../../entities/index'
import { AppError } from '../../errors'
import { iReturnSchedules } from '../../interfaces/schedules.interfaces'
import { returnSchedulesByRealEstateSchema } from '../../schemas/schedules.schema'

const listSchedulesInRealEstateService = async (idRealEstate: number): Promise<RealEstate> => {
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const realEstate: RealEstate | null = await realEstateRepository.findOne({ 
        where: { 
            id: idRealEstate 
        },
        relations: {
            schedules: {
                user: true
            },
            address: true,
            category: true
        } 
    })
    if(!realEstate){
        throw new AppError('RealEstate not found', 404)
    }

    // const returnSchedules: iReturnSchedules = returnSchedulesByRealEstateSchema.parse(realEstate)

    return realEstate
}

export default listSchedulesInRealEstateService