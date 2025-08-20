import { render, screen } from '@testing-library/react';
import App from './App';

test('renders chat container', () => {
  render(<App />);
  const chatHeader = screen.getByText(/chat/i);
  expect(chatHeader).toBeInTheDocument();
});
