import { Request, Response } from "express";
import { AppDataSource } from "../data-source"

export default class ProjectController {

    async newProject (req: Request, res: Response) {
        const { name, budget, category } = req.body

        try {
            const novoProjeto = await AppDataSource.query(`
                INSERT INTO projects (name, budget, category_id) VALUES ($1, $2, $3)
            `, [name, budget, category ])

            return res.json(novoProjeto)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

}