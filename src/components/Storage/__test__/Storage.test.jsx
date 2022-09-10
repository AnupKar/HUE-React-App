import React from 'react';
import { render, screen } from '@testing-library/react';
import { HvcProvider } from '../../../context';
import { MemoryRouter } from 'react-router-dom';
import {Storage} from '../Storage'
describe('For Storage Component', () => {
    it('should render the component', () => {
      render(
        <HvcProvider>
          <Storage />
        </HvcProvider>,
        { wrapper: MemoryRouter }
      );
    });
});