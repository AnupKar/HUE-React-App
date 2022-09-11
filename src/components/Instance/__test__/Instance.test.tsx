import React from 'react';
import { render, screen } from '@testing-library/react';
import { HvcProvider } from '../../../context';
import { MemoryRouter } from 'react-router-dom';
import {Instance} from '../Instance'
describe('For Instance Component', () => {
    it('should render the component', () => {
      render(
        <HvcProvider>
          <Instance />
        </HvcProvider>,
        { wrapper: MemoryRouter }
      );
    });
    /*it('should select check ', () => {
        render(<Instance />, { wrapper: MemoryRouter });
        const selectBtn = screen.getByTestId('instance-element');
        expect(selectBtn).toBeInTheDocument();
        fireEvent.click(selectBtn);
      });*/
  });