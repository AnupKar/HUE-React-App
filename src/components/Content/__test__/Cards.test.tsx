import React from 'react';
import { render, screen } from '@testing-library/react';
import { Cards } from '../Cards';

import { HvcProvider } from '../../../context';
import { MemoryRouter } from 'react-router-dom';

describe('<Cards />', () => {
  it('should render the component', () => {
    render(
      <HvcProvider>
        <Cards />
      </HvcProvider>,
      { wrapper: MemoryRouter }
    );
  });
});
