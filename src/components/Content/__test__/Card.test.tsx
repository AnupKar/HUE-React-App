import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../Card';

import { HvcProvider } from '../../../context';
import { MemoryRouter } from 'react-router-dom';

const image = {
  id: 1,
  name: 'Linux 2 Image',
  description: 'Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance.',
  bit: [
    { id: 1, name: '64-bit (x86)', price: '243.61' },
    { id: 2, name: '64-bit (ARM)', price: '243.61' },
  ],
};

const MockCard = () => {
  return (
    <HvcProvider>
      <Card image={image} />
    </HvcProvider>
  );
};

describe('<Card />', () => {
  it('should render the component', () => {
    render(<MockCard />, { wrapper: MemoryRouter });
  });

  it('should select the IMAGE', () => {
    render(<MockCard />, { wrapper: MemoryRouter });
    const selectBtn = screen.getByText(/Select/i);
    expect(selectBtn).toBeInTheDocument();
    fireEvent.click(selectBtn);
  });

  it('should change the IMAGE Type', () => {
    render(<MockCard />, { wrapper: MemoryRouter });
    const radioButton = screen.getByLabelText("64-bit (ARM)");
    expect(radioButton).toBeInTheDocument();
    fireEvent.click(radioButton);
  });
});
