import { describe, it, vi, expect } from 'vitest'
import { render, screen } from "@testing-library/react"

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
    const { getByTestId } = render(<Form onSubmit={spy} />)

    customers.filter(customer => customer.privacy).forEach(customer => {
      (getByTestId('name') as HTMLInputElement).value = customer.name;
      (getByTestId('age') as HTMLInputElement).value = customer.age.toString();
      (getByTestId('birthdate') as HTMLInputElement).value = customer.birthdate;
      (getByTestId(customer.color) as HTMLInputElement).select();
      (getByTestId('job') as HTMLInputElement).value = customer.job;
      (getByTestId('privacy') as HTMLInputElement).checked = customer.privacy!;

      const tempFile = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(tempFile);
      (getByTestId('image') as HTMLInputElement).files = dataTransfer.files;

      screen.getByTestId('submit').click()

      const result = {...customer, image: 'chucknorris.png'}
      
      delete result.privacy
      
      expect(spy).toBeCalledWith(
        expect.objectContaining(result)
      )
    })
  })
})
