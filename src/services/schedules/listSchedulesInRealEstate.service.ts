import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { RealEstate, Schedule } from '../../entities/index'
import { AppError } from '../../errors'
import { iReturnSchedules } from '../../interfaces/schedules.interfaces'

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

    return realEstate
}

export default listSchedulesInRealEstateService