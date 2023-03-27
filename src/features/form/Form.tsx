import { Component, FormEvent, ChangeEvent } from "react"
import { Customer } from "../customers/Customers"
import Textfield from "../../components/Textfield"
import Selectfield from "../../components/Selectfield"

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
    this.handleSelectChange = this.handleSelectChange.bind(this)
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
    alert("Form submitted successfully!")
  }
  handleSelectChange(name: keyof Omit<TForm, "image" | "privacy">) {
    return (e: ChangeEvent<HTMLSelectElement>) => {
      this.form[name] = e.target.value
    }
  }
  handleChange(name: keyof Omit<TForm, "image" | "privacy">) {
    return (e: ChangeEvent<HTMLInputElement>) => {
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
        <Textfield type="text" error={this.state.errors.name} name={"name"} onUpdate={this.handleChange} />
        <Textfield type="number" error={this.state.errors.age} name={"age"} onUpdate={this.handleChange} />
        <Textfield type="date" error={this.state.errors.birthdate} name={"birthdate"} onUpdate={this.handleChange} />
        
        <label className={this.state.errors.color ? "invalid" : ""}>Choose your favourite color:{this.state.errors.color}</label>
        <Textfield type="radio" value="red" label="red" error={""} name={"color"} onUpdate={this.handleChange} />
        <Textfield type="radio" value="blue" label="blue" error={""} name={"color"} onUpdate={this.handleChange} />
        <Textfield type="radio" value="green" label="green" error={""} name={"color"} onUpdate={this.handleChange} />
        <Textfield type="radio" value="yellow" label="yellow" error={""} name={"color"} onUpdate={this.handleChange} />

        <Selectfield defaultValue={""} error={this.state.errors.job} name={"job"} onUpdate={this.handleSelectChange} options={[
            { value: "developer", label: "Developer" },
            { value: "designer", label: "Designer" },
            { value: "manager", label: "Manager" },
          ]} 
        />

        <Textfield type="file" label="Profile Image" error={this.state.errors.image} name={"image"} onUpdate={this.handleFileChange} />
        <Textfield type="checkbox" label="Accept Privacy policy" error={this.state.errors.privacy} name={"privacy"} onUpdate={this.handleCheckboxChange} />

        <button data-testid="submit" type="submit">Submit</button>
      </form>
    )
  }
}

export default Form
