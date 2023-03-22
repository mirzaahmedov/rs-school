import { Component, FormEvent } from 'react'

type Props = {

}
type State = {

}
type Form = {
  name: string
  age: number
  birthdate: string
  job: string
  married: boolean | undefined
  color: string
  image: File | undefined
}

class Forms extends Component<Props, State> {
  form: Form

  constructor(props: Props){
    super(props)
    this.form = {
      name: '',
      birthdate: '',
      job: '',
      age: 0,
      married: undefined,
      color: '',
      image: undefined
    }
  }

  handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    console.log(this.form)
  }
  handleChange(name: string) {
    return (e: any) => {
      this.setState({ [name]: e.target?.value })
    }
  }
  handleCheckboxChange(name: string) {
    return (e: any) => {
      this.setState({ [name]: e.target?.checked })
    }
  }
  handleFileChange(name: string) {
    return (e: any) => {
      this.setState({ [name]: e.target?.files[0] })
    }
  }
  render(){
    return(
      <div>
        <h1>Forms</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={this.handleChange("name")} />
          <br />

          <label htmlFor="age">Age:</label>
          <input type="number" id="age" name="age" onChange={this.handleChange("age")} />
          <br />

          <label htmlFor="birthdate">Birth date:</label>
          <input type="date" id="birthdate" name="birthdate" onChange={this.handleChange("birthdate")} />
          <br />

          <label htmlFor="married">Are your married:</label>
          <input type="checkbox" id="married" name="married" onChange={this.handleCheckboxChange("married")} />
          <br />

          <label htmlFor="color">color:</label>
          <input type="radio" id="color" name="color" value="red" onChange={this.handleChange("color")} />
          <input type="radio" id="color" name="color" value="blue" onChange={this.handleChange("color")} />
          <input type="radio" id="color" name="color" value="green" onChange={this.handleChange("color")} />
          <input type="radio" id="color" name="color" value="yellow" onChange={this.handleChange("color")} />
          <br />

          <label htmlFor="job">Job:</label>
          <select id="job" name="job" onChange={this.handleChange("job")}>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>

          <br />
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" name="image" onChange={this.handleFileChange("image")} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Forms
