import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Project } from "../entities/Project";

export default class ProjectController {

    async newProject (req: Request, res: Response) {
        const { name, budget, category } = req.body

        try {
			const newProject = AppDataSource.manager.create(Project, { name, budget, category })
			await AppDataSource.manager.save(Project, newProject)

            return res.json(newProject)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }
    
    async projects (req: Request, res: Response) {
        const { id } = req.body
        try{
            const projects = await AppDataSource.manager.find(Project, {
				relations: {
					services: true,
					category: true,
				},
                order: {
                    id: "DESC"
                }
			})
            return res.json(projects)
        } catch(error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async deleteProject(req: Request, res: Response) {
        const { id } = req.params
        try {   
            const project: any = await AppDataSource.manager.findOneBy(Project, { id: Number(id) })
            if (!project){
                return res.json({message: "Id inválido!"})
            }
            const deleteProject = await AppDataSource.manager.remove(Project, project)
            return res.json(project)     
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async findProject(req: Request, res: Response) {
        const { id } = req.params
        try {   
            const project: any = await AppDataSource.manager.find(Project, { 
                relations: {
                    services: true,
                    category: true
                }, where: {
                    id: Number(id)
                }
            })
            if (!project){
                return res.json({message: "Id inválido!"})
            }
            return res.json(project[0])
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

    async updateProject (req: Request, res: Response) {
        const { id } = req.params
        const { name, budget, category, cost } = req.body
        try {   
            const updatedProject = AppDataSource.manager.create(Project, { id: Number(id), name, budget, cost, category })
			await AppDataSource.manager.save(Project, updatedProject)

            return res.json(updatedProject)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }
}