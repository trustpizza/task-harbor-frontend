// ErrorDisplay.test.jsx (using Vitest)
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorDisplay from "../../../src/components/Shared/ErrorDisplay";

describe('ErrorDisplay', () => {
  it('renders the error message correctly', () => {
    const errorMessage = 'Something went wrong!';
    render(<ErrorDisplay message={errorMessage} />);

    // Check if the error message is displayed
    const errorMessageElement = screen.getByText(errorMessage);  // Or getByRole if you have a role set
    expect(errorMessageElement).toBeInTheDocument();

    //You can also do a snapshot test if you wish
  });

  it('renders a default message if no message is provided', () => {
    render(<ErrorDisplay />); // No message prop

    const defaultMessageElement = screen.getByText('An unknown error occurred.'); // Or your default message
    expect(defaultMessageElement).toBeInTheDocument();
  });

  it('does not render anything if the message is empty', () => {
    render(<ErrorDisplay message="" />);

    // Check if the *entire* ErrorDisplay is absent from the DOM
    const errorDisplayElement = screen.queryByRole('alert'); // Or queryByText if you don't have role alert
    expect(errorDisplayElement).not.toBeInTheDocument();
  });
});