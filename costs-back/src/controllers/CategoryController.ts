import { Request, Response } from "express";
import { AppDataSource } from "../data-source"

export default class CategoryController {

    async selectCategories (req: Request, res: Response) {
        try {
            const categories = await AppDataSource.query(`
                SELECT * FROM categories
            `)
            return res.json(categories)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

}