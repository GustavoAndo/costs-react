import { Router } from 'express'
import ProjectController from '../controllers/ProjectController'

const routesProject = Router()

routesProject.post('/newProject', new ProjectController().newProject)

export default routesProject