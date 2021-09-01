import { render, screen } from '@testing-library/react';
import Admin from './admin';

test('renders learn react link', () => {
  render(<Admin />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
