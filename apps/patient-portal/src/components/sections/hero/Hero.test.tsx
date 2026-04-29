import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from './Hero';

describe('Hero Component', () => {
  it('renders correctly', () => {
    render(<Hero>Test Content</Hero>);
    expect(screen.getByText('Test Content')).toBeDefined();
  });
});
