import { z } from 'zod'
import { returnSchedulesByRealEstateSchema } from '../schemas/schedules.schema'

type iReturnSchedules = z.infer<typeof returnSchedulesByRealEstateSchema>

export { iReturnSchedules }