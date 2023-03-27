import { describe, it, vi, expect } from 'vitest'
import { render, screen, fireEvent } from "@testing-library/react"

import Form from './Form'
import { Customer } from '../customers/Customers'

describe('form component', () => {
  const customers: (Customer & { privacy?: boolean })[] = [
    {
      name: "John Doe",
      age: "23",
      birthdate: "1988-05-12",
      color: "blue",
      job: "Software Engineer",
      image: "https://example.com/john-doe.jpg",
      privacy: true
    },
    {
      name: "Jane Smith",
      age: "28",
      birthdate: "1995-09-02",
      color: "green",
      job: "Graphic Designer",
      image: "https://example.com/jane-smith.jpg",
      privacy: false
    },
    {
      name: "Bob Johnson",
      age: "42",
      birthdate: "1979-12-24",
      color: "red",
      job: "Marketing Manager",
      image: "https://example.com/bob-johnson.jpg",
      privacy: true
    },
  ];

  it('should not submit with no data', () => {
    const spy = vi.fn()

    const { unmount } = render(<Form onSubmit={spy} />)

    screen.getByTestId('submit').click()

    expect(spy).not.toHaveBeenCalled()

    unmount()
  })
  it("should submit with valid data", () => {
    const spy = vi.fn()

    const get = (name: string) => (screen.getByTestId(name) as HTMLInputElement)

    customers.filter(customer => customer.privacy).forEach(customer => {
      const { unmount } = render(<Form onSubmit={spy} />)

      fireEvent.change(get("name"), { target: { value: customer.name } })
      fireEvent.change(get("age"), { target: { value: customer.age } })
      fireEvent.change(get("birthdate"), { target: { value: customer.birthdate } })
      fireEvent.click(get(customer.color))
      fireEvent.change(get("job"), { target: { value: customer.job } })

      const file = new File(['Hello World'], 'test.txt', { type: 'text/plain' });

      fireEvent.change(get("image"), { target: { files: [file] } })

      screen.getByTestId('submit').click()

      const result = {...customer, image: 'chucknorris.png'}
      
      delete result.privacy
      
      expect(spy).toBeCalledWith(
        expect.objectContaining(result)
      )

      unmount()
    })
  })
})
