import ProjectForm from '../project/ProjectForm'
import styles from './css/NewProject.module.css'
import { useNavigate } from 'react-router-dom'

function NewProject() {

    const navigate = useNavigate()

    function createPost(project: any) {
        const saveProject = {
            name: project.name,
            budget: project.budget,
            category: project.category.id
        }

        fetch('http://localhost:5000/project/newProject', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(saveProject),
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data)
            //redirect
            navigate('/projects', {state: {message: 'Projeto criado com sucesso!' }})
          })
          .catch((err) => console.log(err))
      }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar um Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText='Criar Projeto'/>
        </div>
    )
}

export default NewProject