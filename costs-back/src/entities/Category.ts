import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Project } from './Project'

@Entity('categories')
export class Category {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @OneToMany(() => Project, project => project.category)
    projects: Project[]

}