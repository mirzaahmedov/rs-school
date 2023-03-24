import styles from "./customers.module.css"

export type Customer = {
  name: string
  age: string
  birthdate: string
  job: string
  color: string
  image: string
}
type Props = {
  data: Customer[]
}

const Customers = ({ data }: Props) => {
  return (
    <div className={styles.Grid}>
      {data.map(customer => (
        <div className={styles.Card}>
          <img className={styles.ProfilePicture} src={customer.image} alt={customer.name} />
          <ul className={styles.Information}>
            <li>Name: {customer.name}</li>
            <li>Age: {customer.age}</li>
            <li>Birth date: {customer.birthdate}</li>
            <li>Job: {customer.job}</li>
            <li>Favourite color: {customer.color}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Customers
