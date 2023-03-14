import { z } from 'zod'
import { createScheduleRequestSchema, createScheduleRequestWidthUserId, createScheduleResultSchema, returnSchedulesByRealEstateSchema } from '../schemas/schedules.schema'

type iReturnSchedules = z.infer<typeof returnSchedulesByRealEstateSchema>
type iRequestCreateSchedule = z.infer<typeof createScheduleRequestSchema>
type iRequestCreateScheduleWidthUserId = z.infer<typeof createScheduleRequestWidthUserId>
type iResultCreateSchedule = z.infer<typeof createScheduleResultSchema>


export { iReturnSchedules, iRequestCreateSchedule, iRequestCreateScheduleWidthUserId, iResultCreateSchedule }