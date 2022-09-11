import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";

export default class CategoryController {

    async selectCategories (req: Request, res: Response) {
        try {
            const categories = await AppDataSource.manager.find(Category)
            return res.json(categories)
        } catch (error) {
            console.log(error)
            return res.json({message: "Internal Server Error"})
        }
    }

}