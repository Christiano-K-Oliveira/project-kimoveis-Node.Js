import { z } from 'zod'
import { realEstateRequestSchema, realEstateResultSchema } from '../schemas/realEstate.schema'

type iRealEstate = z.infer<typeof realEstateRequestSchema>
type iRealEstateReturn = z.infer<typeof realEstateResultSchema>


export { iRealEstate, iRealEstateReturn }