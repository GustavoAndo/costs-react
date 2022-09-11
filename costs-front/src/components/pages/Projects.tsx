import { useLocation } from "react-router-dom"
import Message from "../layout/Message"
import styles from './css/Projects.module.css'
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'

interface Project {
    id: number,
    name: string,
    budget: number,
    category: {
        id: number,
        name: string
    },
    cost: number,
    services: any[]
}

function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState<string>()

    const location = useLocation()
    let message = ''
    if (location.state) {
      message = 'Projeto criado com sucesso!'  
    }

    useEffect(() => {
        
        fetch('http://localhost:5000/project/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then((data) => {
            setProjects(data)
            setRemoveLoading(true)
        }).catch(err => console.log(err))

    }, [])

    function deleteProject (id: number) {

        fetch(`http://localhost:5000/project/deleteProject/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }   
        }).then(resp => resp.json())
        .then(data => {
            setProjects(projects.filter(project => project.id !== id))
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch(err => console.log(err))

    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}> 
                <h1>Meus Projetos</h1>
                <LinkButton to="/newProject" text="Criar Projeto"/>
            </div>
            {message && <Message type="success" msg={message}/>}
            {projectMessage && <Message type="success" msg={projectMessage}/>}
            <Container customClass="start">
                {projects.length > 0 && (
                    projects.map((project) => (
                        <ProjectCard 
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={deleteProject}
                        />
                    ))
                )}
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados</p>
                )}
            </Container>
        </div>
    )
}

export default Projects