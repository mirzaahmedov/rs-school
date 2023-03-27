import { ChangeEvent, Component, InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  name: string
  error: string
  onUpdate: (name: any) => (e: ChangeEvent<HTMLInputElement>) => void
}

export default class Textfield extends Component<Props> {
  render() {
    const { onUpdate, ...props } = this.props
    return (
      <>
        <label htmlFor={this.props.name}>{this.props.label || this.props.name}</label>
        <input 
          {...props}
          data-testid={this.props.type === "radio" ? this.props.value : this.props.name} 
          id={this.props.name} 
          name={this.props.name} 
          onChange={this.props.onUpdate(this.props.name)} 
        />
        {this.props.error ? (
          <span>{this.props.error}</span>
        ) : null}
      </>
    )
  }
}
