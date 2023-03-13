import { Repository } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { Address } from '../../entities/addresses.entity'
import { Category } from '../../entities/categories.entity'
import { RealEstate } from '../../entities/realEstate.entity'
import { AppError } from '../../errors'
import { iRealEstate, iRealEstateReturn } from '../../interfaces/realEstate.interfaces'
import { addressSchema, realEstateResultSchema, realEstateSchema } from '../../schemas/realEstate.schema'

const createRealStateService = async (realEstateData: iRealEstate): Promise<iRealEstateReturn> => {
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)
    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

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
            throw new AppError("User don't have permission", 403)
        }
    }

    const checkNameAddressExists = await addressRepository.exist({ where: {
        street: addressData.street,
        zipCode: addressData.zipCode,
        city: addressData.city,
        state: addressData.state
    } })

    if(checkNameAddressExists){
        throw new AppError('Address already exists.', 409)
    }

    const newAddress = addressRepository.create(addressData)
    await addressRepository.save(addressData)

    // if(realEstateData.categoryId !== undefined){
    // }
    const findCategory = await categoryRepository.findOneBy({
        id: realEstateData.categoryId
    })

    if(findCategory){
        const newRealEstate = realEstateRepository.create({
            address: newAddress,
            ...realEstate,
            category: findCategory
        })
        await realEstateRepository.save(realEstate)

        const returnRealEstate: iRealEstateReturn = realEstateResultSchema.parse({
            ...newRealEstate,
            address: {
                ...newAddress
            }
        })
    
        return returnRealEstate
    }
    
    const newRealEstate = realEstateRepository.create({
        address: newAddress,
        ...realEstate,
    })
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