import styles from './css/SubmitButton.module.css'

interface Props {
    text: string
}

function SubmitButton({ text }: Props) {
    return (
        <div>
            <button className={styles.btn}>{text}</button>
        </div>
    )
}

export default SubmitButton