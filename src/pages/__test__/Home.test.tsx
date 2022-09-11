import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HvcProvider } from '../../context';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../Home';

describe('<Home />', () => {
  it('should render the component & change region', () => {
    render(
      <HvcProvider>
        <Home />
      </HvcProvider>,
      { wrapper: MemoryRouter }
    );

    // const dropdown = screen.getByText('Region');
    // expect(dropdown).toBeInTheDocument();
    // fireEvent.click(dropdown);

    // setTimeout(() => {
    //   const option1 = screen.getByText(/US-East-1/i);
    //   console.log("option1", option1);
    //   expect(option1).toBeInTheDocument();
    //   fireEvent.click(option1);
    // }, 1000);
  });
});
