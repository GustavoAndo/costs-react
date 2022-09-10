import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Project } from './Project'

@Entity('services')
export class Service {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

	@ManyToMany(() => Project, project => project.services)
	projects: Project[]

}