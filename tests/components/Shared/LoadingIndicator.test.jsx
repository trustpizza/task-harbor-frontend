import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingIndicator from '../../../src/components/Shared/LoadingIndicator';

describe('LoadingIndicator', () => {
  it('should render the loading indicator with default size and color', () => {
    render(<LoadingIndicator />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-6 h-6'); // Default size is md
    expect(spinner).toHaveClass('border-primary'); // Default color is primary
    expect(spinner).toHaveClass('animate-spin');
    expect(spinner).toHaveClass('rounded-full');
    expect(spinner).toHaveClass('border-2');
    expect(spinner).toHaveClass('border-t-transparent');
    expect(screen.getByText('Loading...')).toBeInTheDocument(); // Check for sr-only text
  });

  it('should render the loading indicator with specified size sm', () => {
    render(<LoadingIndicator size="sm" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-4 h-4');
  });

  it('should render the loading indicator with specified size lg', () => {
    render(<LoadingIndicator size="lg" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-8 h-8');
  });

  it('should render the loading indicator with specified size xl', () => {
    render(<LoadingIndicator size="xl" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-10 h-10');
  });

  it('should render the loading indicator with specified color secondary', () => {
    render(<LoadingIndicator color="secondary" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('border-secondary');
  });

  it('should render the loading indicator with specified color accent', () => {
    render(<LoadingIndicator color="accent" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('border-accent');
  });

  it('should render the loading indicator with specified color error', () => {
    render(<LoadingIndicator color="error" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('border-error');
  });

  it('should apply additional className', () => {
    render(<LoadingIndicator className="my-custom-class" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('my-custom-class');
  });

  it('should handle invalid size and color props gracefully', () => {
    render(<LoadingIndicator size="invalid" color="invalid" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('w-6 h-6'); // Should fallback to default size (md)
    expect(spinner).toHaveClass('border-primary'); // Should fallback to default color (primary)
  });
});