import { useParams } from 'react-router-dom'
import { useState, useEffect} from 'react'
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import styles from './css/Project.module.css'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'

function Project() {
    const { id } = useParams()

    interface Project {
        id?: number,
        name?: string,
        budget?: number,
        cost?: number,
        category?: {
            id?: number,
            name?: string
        }
        services?: any
    }

    const [project, setProject] = useState<Project>({})
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5000/project/findProject/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.json())
        .then(data => {
            setProject(data)
        })
        .catch(err => console.log(err))
    }, [id])

    function editPost(project: Project) {

        if (Number(project.budget) < Number(project.cost)) {
            setMessage('O orçamento não pode ser menor do que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/project/updateProject/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(data => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('success')
        })
        .catch(err => console.log(err))
    }
    
    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    return (
        <>
            {project.name ? 
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span> {project.category?.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento: </span>R$ {project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado: </span>R$ {project.cost}
                                    </p>
                                </div>
                                ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project}/>
                                </div>
                                )}
                        </div>
                    </Container>
                </div>
            : <Loading/>}
        </>
    )
}

export default Project