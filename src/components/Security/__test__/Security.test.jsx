import React from 'react';
import { render, screen } from '@testing-library/react';
import { HvcProvider } from '../../../context';
import { MemoryRouter } from 'react-router-dom';
import {Security} from '../Storage'
describe('For Storage Component', () => {
    it('should render the component', () => {
      render(
        <HvcProvider>
          <Security />
        </HvcProvider>,
        { wrapper: MemoryRouter }
      );
    });
});