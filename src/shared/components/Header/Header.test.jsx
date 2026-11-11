import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('Header should be rendered', () => {
  const { asFragment } = render(<Header />);
  expect(screen.getByAltText('Jobsity-calendar-header-logo')).toBeInTheDocument();
  // brand link must stay inside the GitHub Pages base path
  expect(screen.getByRole('link')).toHaveAttribute('href', import.meta.env.BASE_URL);
  expect(asFragment()).toMatchSnapshot();
});
