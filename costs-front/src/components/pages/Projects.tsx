import { useLocation } from "react-router-dom"
import Message from "../layout/Message"

function Projects() {

    const location = useLocation()
    let message = ''
    if (location.state) {
      message = 'Projeto criado com sucesso!'  
    }

    return (
        <div>
            <h1>Projects</h1>
            {message && <Message type="success" msg={message}/>}
        </div>
    )
}

export default Projects