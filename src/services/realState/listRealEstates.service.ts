import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { RealEstate } from '../../entities'
import { iReturnRealEstates } from '../../interfaces/realEstate.interfaces'
import { returnListRealEstatesSchema } from '../../schemas/realEstate.schema'

const listRealEstatesService = async (): Promise<iReturnRealEstates> => {
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const listRealEstates: RealEstate[] = await realEstateRepository.find({
        relations: {
            address: true
        }
    })

    const returnListRealEstates: iReturnRealEstates = returnListRealEstatesSchema.parse(listRealEstates)

    return returnListRealEstates
}

export default listRealEstatesService