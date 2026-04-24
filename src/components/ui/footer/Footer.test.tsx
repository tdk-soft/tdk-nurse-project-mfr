import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer Component', () => {
  it('renders correctly', () => {
    render(<Footer>Test Content</Footer>);
    expect(screen.getByText('Test Content')).toBeDefined();
  });
});
