import React from 'react';
import { render, screen } from '@testing-library/react';
import { SuccessPrompt } from '../SuccessPrompt';

describe('<SuccessPrompt />', () => {
  it('should render the component', () => {
    render(
        <SuccessPrompt />,
    );
  });
});
