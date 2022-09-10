import { Router } from 'express'
import routesCategory from './routesCategory'

const routes = Router()

routes.use('/category', routesCategory)

export default routes