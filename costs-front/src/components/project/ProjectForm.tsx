import styles from './css/ProjectForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import { useState, useEffect } from 'react'

interface Props {
    handleSubmit: Function
    btnText: string
    projectData ?: any
}

function ProjectForm ({ handleSubmit, btnText,  projectData}: Props){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch('http://localhost:5000/category/selectCategories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            setCategories(data)
          })
      }, [])

    const submit = (e: any) => {
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    } 

    function handleChange(e: any) {
        setProject({...project, [e.target.name]: e.target.value})
    }

    function handleSelect(e: any) {
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input type='text' text='Nome do Projeto' name='name' placeholder='Insira o nome do projeto' handleOnChange={handleChange} value={project.name ? project.name : ''}/>
            <Input type='number' text='Orçamento do projeto' name='budget' placeholder='Insira o orçamento total' handleOnChange={handleChange} value={project.budget ? project.budget : ''}/>
            <Select name='category_id' text='Selecione a categoria' options={categories} handleOnChange={handleSelect} value={project.category ? project.category.id : ''}/>
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm