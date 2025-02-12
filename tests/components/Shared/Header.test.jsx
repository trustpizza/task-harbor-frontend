// Header.test.jsx
import { render, screen } from '@testing-library/react';
import Header from '../../../src/components/Shared/Header';
import { describe, it, expect } from 'vitest';

describe('Header', () => {
  it('renders the title prop correctly', () => {
    const title = 'My Application';
    render(<Header title={title} />);

    // Check if the title is rendered and has the correct text
    const titleElement = screen.getByRole('heading', { level: 1, name: title }); // More specific query
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(title);
  });

  it('renders a default title if no title prop is provided', () => {
    render(<Header />); // No title prop

    const defaultTitleElement = screen.getByRole('heading', { level: 1 }); // Less specific query
    expect(defaultTitleElement).toBeInTheDocument();
    // You could also add a default title to the component and check for that
  });

  it('applies the correct styling', () => {
    const title = "Test Title"
    render(<Header title={title} />);

    const headerElement = screen.getByRole('banner'); // Check if the header element has correct role
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.classList.contains('bg-base-100')).toBe(true);
    expect(headerElement.classList.contains('shadow-lg')).toBe(true);
    expect(headerElement.classList.contains('p-4')).toBe(true);


    const titleElement = screen.getByRole('heading', { level: 1, name: title });
    expect(titleElement.classList.contains('text-2xl')).toBe(true);
    expect(titleElement.classList.contains('font-bold')).toBe(true);
  });
});