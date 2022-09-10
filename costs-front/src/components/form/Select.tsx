import styles from './css/Select.module.css'

interface Props {
    text: string,
    name: string,
    options: {id : number, name: string}[],
    handleOnChange: any,
    value: any
}

function Select({ text, name, options, handleOnChange, value }: Props) {

    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name} onChange={handleOnChange} {...value && (value ={value})}>
                <option disabled selected>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Select