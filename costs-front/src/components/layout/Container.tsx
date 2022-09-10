import styles from './css/Container.module.css'

function Container(props: any) {
  return (
    <div className={`${styles.container} ${styles[props.customClass]}`}>
      {props.children}
    </div>
  )
}

export default Container