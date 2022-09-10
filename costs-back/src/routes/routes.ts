import { Router } from 'express'
import routesCategory from './routesCategory'
import routesProject from './routesProject'

const routes = Router()

routes.use('/category', routesCategory)
routes.use('/project', routesProject)

export default routes