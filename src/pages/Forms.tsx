import { Component } from 'react'
import Customers, { Customer } from "../features/Customers"
import Form from "../features/Form"

type Props = {

}
type State = {
  customers: Customer[]
}
class Forms extends Component<Props, State> {
  constructor(props: Props){
    super(props)

    this.state = {
      customers: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(customer: Customer){
    this.setState({
      customers: [customer, ...this.state.customers]
    })
  }
  render(){
    return(
      <div>
        <Form onSubmit={this.handleSubmit} />
        <Customers data={this.state.customers} />
      </div>
    )
  }
}

export default Forms
