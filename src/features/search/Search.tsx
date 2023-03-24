import { Component } from "react"
import { SearchIcon } from "../../assets/icons"
import styles from "./search.module.css"

type Props = {

}
type State = {
  value: string
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    
    const value = localStorage.getItem('search') || ''

    this.state = {
      value,
    }
  }
  componentWillUnmount(): void {
    localStorage.setItem('search', this.state.value)
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value })
  }
  render() {
    return (
      <form className={styles.Form} onSubmit={e => e.preventDefault()}>
        <SearchIcon className={styles.Icon} />
        <input type="text" className={styles.Input} value={this.state.value} onChange={this.handleChange} />
      </form>
    )
  }
}


export default Search
