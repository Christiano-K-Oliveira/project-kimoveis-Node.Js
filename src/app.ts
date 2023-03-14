import 'express-async-errors'
import express, { Application } from 'express'
import { errorHandler } from './errors'
import loginRoutes from './routes/login.routes'
import usersRoutes from './routes/users.routes'
import realEstateRoutes from './routes/realEstate.routes'
import schedulesRoutes from './routes/schedules.routes'
import categoriesRoutes from './routes/categories.routes'


const app: Application = express()
app.use(express.json())

app.use('/users', usersRoutes)
app.use('/login', loginRoutes)
app.use('/realEstate', realEstateRoutes)
app.use('/schedules', schedulesRoutes)
app.use('/categories', categoriesRoutes)

app.use(errorHandler)

export default app