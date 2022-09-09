import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { HvcContext } from './context';

export const mockValues = {
  navId: 1,
  handleNavChange: () => {},
  region: 'US',
  handleSelectRegion: () => {},
  images: [
    {
      id: 1,
      name: 'Image',
      bit: {
        name: 'Linux',
        price: 100,
      },
    },
  ],
  handleSetImages: () => {},
  handleSetInstance: () => {},
  handleStorage: () => {},
};

describe('<App />', () => {
  it('should render the component', () => {
    render(
      <HvcContext.Provider value={mockValues}>
        <App />
      </HvcContext.Provider>,
      { wrapper: MemoryRouter }
    );
  });
});
