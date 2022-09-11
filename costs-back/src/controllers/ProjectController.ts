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

}