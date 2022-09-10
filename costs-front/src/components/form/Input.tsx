import styles from './css/Input.module.css'

interface Props {
    type: string,
    text: string,
    name: string,
    placeholder: string,
    handleOnChange: any,
    value: any
}

function Input({ type, text, name, placeholder, handleOnChange, value }: Props) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input type={type} name={name} id={name} placeholder={placeholder} onChange={handleOnChange}/>
        </div>
    )
}

export default Input