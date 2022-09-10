import { useLocation } from "react-router-dom"
import Message from "../layout/Message"
import styles from './css/Project.module.css'
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"

function Projects() {

    const location = useLocation()
    let message = ''
    if (location.state) {
      message = 'Projeto criado com sucesso!'  
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}> 
                <h1>Projects</h1>
                <LinkButton to="/newProject" text="Criar Projeto"/>
            </div>
            {message && <Message type="success" msg={message}/>}
            <Container customClass="start">
                <p>projetos...</p>
            </Container>
        </div>
    )
}

export default Projects