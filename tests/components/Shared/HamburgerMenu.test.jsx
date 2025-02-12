import { render, screen } from '@testing-library/react';
import HamburgerMenu from '../../../src/components/Shared/HamburgerMenu';

describe('HamburgerMenu', () => {
  it('should render the loading indicator with default size and color', () => {
    render(<HamburgerMenu />);
    const spinner = screen.getByTestId("hamburgerMenu");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-6 h-6'); // Default size is md
    expect(spinner).toHaveClass('primary'); // Default color is primary
  });

  it('should render the loading indicator with specified size sm', () => {
    render(<HamburgerMenu size="sm" />);
    const spinner = screen.getByTestId("hamburgerMenu");
    expect(spinner).toHaveClass('w-4 h-4');
  });

  it('should render the loading indicator with specified size lg', () => {
    render(<HamburgerMenu size="lg" />);
    const spinner = screen.getByTestId("hamburgerMenu");
    expect(spinner).toHaveClass('w-8 h-8');
  });

  it('should render the loading indicator with specified size xl', () => {
    render(<HamburgerMenu size="xl" />);
    const spinner = screen.getByTestId("hamburgerMenu");
    expect(spinner).toHaveClass('w-10 h-10');
  });

  it('should render the loading indicator with specified color secondary', () => {
    render(<HamburgerMenu color="secondary" />);
    const spinner = screen.getByTestId("hamburgerMenu");
    expect(spinner).toHaveClass('secondary');
  });

  it('should render the loading indicator with specified color accent', () => {
    render(<HamburgerMenu color="accent" />);
    const spinner = screen.getByTestId("hamburgerMenu");
    expect(spinner).toHaveClass('accent');
  });

  it('should render the loading indicator with specified color error', () => {
    render(<HamburgerMenu color="error" />);
    const spinner = screen.getByTestId("hamburgerMenu");
    expect(spinner).toHaveClass('error');
  });

  it('should apply additional className', () => {
    render(<HamburgerMenu className="my-custom-class" />);
    const spinner = screen.getByTestId("hamburgerMenu");
    expect(spinner).toHaveClass('my-custom-class');
  });

  it('should handle invalid size and color props gracefully', () => {
    render(<HamburgerMenu size="invalid" color="invalid" />);
    const spinner = screen.getByTestId("hamburgerMenu");
    expect(spinner).toHaveClass('w-6 h-6'); // Should fallback to default size (md)
    expect(spinner).toHaveClass('primary'); // Should fallback to default color (primary)
  });
});