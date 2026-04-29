import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  it('renders correctly with brand and contact button', () => {
    render(<Navbar />);
    
    // On vérifie que le lien "Soins" est là
    expect(screen.getByText('Soins')).toBeDefined();
    
    // On vérifie le bouton d'appel
    expect(screen.getByText(/Appeler Medinko/i)).toBeDefined();
  });
});