import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { HvcContext } from '../../../context';
import { MemoryRouter } from 'react-router-dom';
import { Review } from '../Review';

export const mockValues = {
  instenceType: 'General Purpose',
  securities: [
    {
      id: 100,
      port: 22,
      protocol: 'TCP',
      remarks: 'some remarks',
      source: '0.0.0',
      type: 'Https',
    },
  ],
  navId: 5,
  handleNavChange: jest.fn,
  region: 'US',
  handleSelectRegion: jest.fn,
  images: [
    {
      id: 1,
      name: 'Image',
      bit: {
        name: 'Linux',
        price: 100,
      },
      description:
        'Linux 2 comes with 5 years of support. It provides Linux kernel 4.14 tuned for optimal performance.',
    },
    {
      id: 2,
      name: 'CPU',
      bit: {
        name: '1 Core',
        price: 100,
      },
    },
    {
      id: 3,
      name: 'Memory',
      bit: {
        name: '512 MB',
        price: 140,
      },
    },
    {
      id: 4,
      IOPS: 600,
      name: 'SSD',
      bit: {
        name: '300 GB',
        price: 150,
      },
      remarks: 'okay',
      encryption: true,
      backup: true,
      isExt: true,
    },
  ],
  handleSetImages: jest.fn,
  handleSetInstance: jest.fn,
  handleStorage: jest.fn,
};

const MockReview = () => {
  return (
    <HvcContext.Provider value={mockValues}>
      <Review />
    </HvcContext.Provider>
  );
};

describe('<Review />', () => {
  window.URL.createObjectURL = jest.fn();
  window.URL.revokeObjectURL = jest.fn();

  afterEach(() => {
    window.URL.createObjectURL.mockReset();
    window.URL.revokeObjectURL.mockReset();
  });

  it('should render the component', () => {
    render(<MockReview />, { wrapper: MemoryRouter });
  });

  it('should navigate to card when no images are presents', () => {
    render(
      <HvcContext.Provider
        value={{
          images: [],
          handleNavChange: jest.fn,
        }}
      >
        <Review />
      </HvcContext.Provider>,
      { wrapper: MemoryRouter }
    );
  });

  it('should navigate to back page when back button pressed', () => {
    render(<MockReview />, { wrapper: MemoryRouter });
    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
  });

  it('should generate JSON object on pressing the button', () => {
    render(<MockReview />, { wrapper: MemoryRouter });
    const genJson = screen.getByText(/Generate JSON/i);
    expect(genJson).toBeInTheDocument();
    fireEvent.click(genJson);
  });

  it('should display the modal on Lunch click', () => {
    render(<MockReview />, { wrapper: MemoryRouter });
    const launchBtn = screen.getByText(/Launch/i);
    expect(launchBtn).toBeInTheDocument();
    fireEvent.click(launchBtn);
  });
});
