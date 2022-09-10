import { DataSource } from "typeorm"
import 'dotenv/config'

export const AppDataSource = new DataSource({
    url: process.env.DATABASE_URL,
    type: "postgres",
	entities: [`${__dirname}/**/entities/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations/*.{ts,js}`]
})

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source inicializado!")
    })
    .catch((e) => {
        console.error("Erro na inicialização do Data Source:", e)
    })