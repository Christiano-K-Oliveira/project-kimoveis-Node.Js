import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Address } from '../../entities/addresses.entity'
import { RealEstate } from '../../entities/realEstate.entity'
import { AppError } from '../../errors'
import { iRealEstate, iRealEstateReturn } from '../../interfaces/realEstate.interfaces'
import { addressSchema, realEstateResultSchema, realEstateSchema } from '../../schemas/realEstate.schema'

const createRealStateService = async (realEstateData: iRealEstate): Promise<iRealEstateReturn> => {
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)

    const addressData = addressSchema.parse(realEstateData.address)
    const realEstate = realEstateSchema.parse(realEstateData)


    if(addressData.number){
        const checkNameAddressExists = await addressRepository.exist({ where: {
            street: addressData.street,
            zipCode: addressData.zipCode,
            number: addressData.number,
            city: addressData.city,
            state: addressData.state
        } })
    
        if(checkNameAddressExists){
            throw new AppError('Address already exists', 409)
        }
    }

    const checkNameAddressExists = await addressRepository.exist({ where: {
        street: addressData.street,
        zipCode: addressData.zipCode,
        city: addressData.city,
        state: addressData.state
    } })

    if(checkNameAddressExists){
        throw new AppError('Address already exists', 409)
    }

    console.log(realEstate)
    const newAddress = addressRepository.create(addressData)
    await addressRepository.save(addressData)
    console.log(addressData)
    
    const newRealEstate = realEstateRepository.create(realEstate)
    await realEstateRepository.save(realEstate)

    const returnRealEstate: iRealEstateReturn = realEstateResultSchema.parse({
        ...newRealEstate,
        address: {
            ...newAddress
        }
    })

    return returnRealEstate
}

export default createRealStateService