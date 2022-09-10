import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn , ManyToMany, JoinTable} from "typeorm"
import { Category } from "./Category"
import { Service } from "./Service"

@Entity('projects')
export class Project {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @Column({type: "decimal", precision: 10, scale: 2})
    budget: number

    @ManyToOne(() => Category, category => category.projects, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'category_id' })
	category: Category

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    cost: number

    @ManyToMany(() => Service, service => service.projects)
	@JoinTable({
		name: 'services_project',
		joinColumn: {
			name: 'service_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'project_id',
			referencedColumnName: 'id',
		},
	})
	services: Service[]
    
}