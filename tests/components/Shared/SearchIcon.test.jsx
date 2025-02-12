import { render, screen } from '@testing-library/react';
import SearchIcon from '../../../src/components/Shared/SearchIcon';

describe('SearchIcon', () => {
  it('should render the loading indicator with default size and color', () => {
    render(<SearchIcon />);
    const spinner = screen.getByTestId("searchIcon");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-6 h-6'); // Default size is md
    expect(spinner).toHaveClass('primary'); // Default color is primary
  });

  it('should render the loading indicator with specified size sm', () => {
    render(<SearchIcon size="sm" />);
    const spinner = screen.getByTestId("searchIcon");
    expect(spinner).toHaveClass('w-4 h-4');
  });

  it('should render the loading indicator with specified size lg', () => {
    render(<SearchIcon size="lg" />);
    const spinner = screen.getByTestId("searchIcon");
    expect(spinner).toHaveClass('w-8 h-8');
  });

  it('should render the loading indicator with specified size xl', () => {
    render(<SearchIcon size="xl" />);
    const spinner = screen.getByTestId("searchIcon");
    expect(spinner).toHaveClass('w-10 h-10');
  });

  it('should render the loading indicator with specified color secondary', () => {
    render(<SearchIcon color="secondary" />);
    const spinner = screen.getByTestId("searchIcon");
    expect(spinner).toHaveClass('secondary');
  });

  it('should render the loading indicator with specified color accent', () => {
    render(<SearchIcon color="accent" />);
    const spinner = screen.getByTestId("searchIcon");
    expect(spinner).toHaveClass('accent');
  });

  it('should render the loading indicator with specified color error', () => {
    render(<SearchIcon color="error" />);
    const spinner = screen.getByTestId("searchIcon");
    expect(spinner).toHaveClass('error');
  });

  it('should apply additional className', () => {
    render(<SearchIcon className="my-custom-class" />);
    const spinner = screen.getByTestId("searchIcon");
    expect(spinner).toHaveClass('my-custom-class');
  });

  it('should handle invalid size and color props gracefully', () => {
    render(<SearchIcon size="invalid" color="invalid" />);
    const spinner = screen.getByTestId("searchIcon");
    expect(spinner).toHaveClass('w-6 h-6'); // Should fallback to default size (md)
    expect(spinner).toHaveClass('primary'); // Should fallback to default color (primary)
  });
});