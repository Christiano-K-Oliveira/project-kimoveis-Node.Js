import { z } from 'zod'
import { realEstateRequestSchema, realEstateResultSchema, returnListRealEstatesSchema } from '../schemas/realEstate.schema'

type iRealEstate = z.infer<typeof realEstateRequestSchema>
type iRealEstateReturn = z.infer<typeof realEstateResultSchema>
type iReturnRealEstates = z.infer<typeof returnListRealEstatesSchema> 

export { iRealEstate, iRealEstateReturn, iReturnRealEstates }