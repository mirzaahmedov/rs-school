import { Component, FormEvent, ChangeEvent } from "react"
import { Customer } from "../customers/Customers"

type Props = {
  onSubmit: (customer: Customer) => void
}
type State = {
  errors: Record<keyof TForm, string>
}
type TForm = Customer & {
  privacy: boolean | undefined
}
class Form extends Component<Props, State> {
  form: TForm

  constructor(props: Props){
    super(props)
    this.form = {
      name: '',
      birthdate: '',
      job: '',
      age: '',
      privacy: undefined,
      color: '',
      image: ''
    }
    this.state = {
      errors: {
        name: '',
        birthdate: '',
        job: '',
        age: '',
        privacy: '',
        color: '',
        image: ''
      }
    }

    this.validateInputs = this.validateInputs.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
  }

  validateInputs(): boolean {
    let valid = true
    
    let errors = this.state.errors
    
    for (let key in this.form) {
      if (!this.form[key as keyof TForm]) {
          errors = {
            ...errors,
            [key as keyof Form]: " is requied"
          }
        valid = false
      }
    }

    this.setState({ errors })
    return valid
  }
  handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    if (!this.validateInputs()) {
      return
    }

    this.setState({
      errors: {
        name: '',
        birthdate: '',
        job: '',
        age: '',
        privacy: '',
        color: '',
        image: ''
      }
    })

    const customer = Object.assign({}, this.form)

    delete customer.privacy
    this.props.onSubmit(customer)

    e.currentTarget.reset()
  }
  handleChange(name: keyof Omit<TForm, "image" | "privacy">) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      this.form[name] = e.target.value
    }
  }
  handleCheckboxChange(name: keyof Pick<TForm, "privacy">) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      this.form[name] = e.target.checked
    }
  }
  handleFileChange(name: keyof Pick<TForm, "image">) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        this.form[name] = URL.createObjectURL(e.target.files[0])
      }
    }
  }
  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <label className={this.state.errors.name ? "invalid" : ""} htmlFor="name">Name: {this.state.errors.name}</label>
        <input data-testid="name" type="text" id="name" name="name" onChange={this.handleChange("name")} />

        <label className={this.state.errors.age ? "invalid" : ""} htmlFor="age">Age:{this.state.errors.age}</label>
        <input data-testid="age" type="number" id="age" name="age" onChange={this.handleChange("age")} />

        <label className={this.state.errors.birthdate ? "invalid" : ""} htmlFor="birthdate">Birth date:{this.state.errors.birthdate}</label>
        <input data-testid="birthdate" type="date" id="birthdate" name="birthdate" onChange={this.handleChange("birthdate")} />
        
        <label className={this.state.errors.color ? "invalid" : ""}>Choose your favourite color:{this.state.errors.color}</label>
        <label htmlFor="color">red</label>
        <input data-testid="red" type="radio" id="color" name="color" value="red" onChange={this.handleChange("color")} />
        <label htmlFor="color">blue</label>
        <input data-testid="blue" type="radio" id="color" name="color" value="blue" onChange={this.handleChange("color")} />
        <label htmlFor="color">green</label>
        <input data-testid="green" type="radio" id="color" name="color" value="green" onChange={this.handleChange("color")} />
        <label htmlFor="color">yellow</label>
        <input data-testid="yellow" type="radio" id="color" name="color" value="yellow" onChange={this.handleChange("color")} />

        <label className={this.state.errors.job ? "invalid" : ""} htmlFor="job">Job:{this.state.errors.job}</label>
        <select data-testid="job" id="job" name="job" defaultValue="" onChange={this.handleChange("job")}>
          <option disabled hidden value="">Not selected</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="manager">Manager</option>
        </select>

        <label className={this.state.errors.image ? "invalid" : ""} htmlFor="image">Image:{this.state.errors.image}</label>
        <input data-testid="image" type="file" id="image" name="image" onChange={this.handleFileChange("image")} />

        <label className={this.state.errors.privacy ? "invalid" : ""} htmlFor="privacy">Accept privacy policy: {this.state.errors.privacy}</label>
        <input data-testid="privacy" type="checkbox" id="privacy" name="privacy" onChange={this.handleCheckboxChange("privacy")} />

        <button data-testid="submit" type="submit">Submit</button>
      </form>
    )
  }
}

export default Form
