import { Router } from 'express'
import ProjectController from '../controllers/ProjectController'

const routesProject = Router()

routesProject.post('/newProject', new ProjectController().newProject)
routesProject.get('/projects', new ProjectController().projects)
routesProject.delete('/deleteProject/:id', new ProjectController().deleteProject)

export default routesProject