import { ChangeEvent, Component, SelectHTMLAttributes } from "react"

export type SelectOption = {
  value: string
  label: string
}
type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  name: string
  error: string
  options: SelectOption[]
  onUpdate: (name: any) => (e: ChangeEvent<HTMLSelectElement>) => void
}

export default class Textfield extends Component<Props> {
  render() {
    const { onUpdate, ...props } = this.props
    return (
      <>
        <label htmlFor={this.props.name}>{this.props.label || this.props.name}</label>
        <select
          {...props}
          data-testid={this.props.name} 
          id={this.props.name} 
          name={this.props.name} 
          onChange={this.props.onUpdate(this.props.name)} 
        >
          <option disabled hidden value="">Not selected</option>
          {this.props.options.map((option: SelectOption) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        {this.props.error ? (
          <span>{this.props.error}</span>
        ) : null}
      </>
    )
  }
}
