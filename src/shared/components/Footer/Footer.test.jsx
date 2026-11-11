import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('Footer should be rendered', () => {
  const { asFragment } = render(<Footer />);
  expect(screen.getByRole('link', { name: 'Mario Granada' })).toHaveAttribute(
    'href',
    'https://github.com/MarioGranada/jobsityCalendar'
  );
  expect(asFragment()).toMatchSnapshot();
});
