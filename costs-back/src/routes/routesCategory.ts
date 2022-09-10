import { Router } from 'express'
import CategoryController from '../controllers/CategoryController'

const routesCategory = Router()

routesCategory.get('/selectCategories', new CategoryController().selectCategories)

export default routesCategory