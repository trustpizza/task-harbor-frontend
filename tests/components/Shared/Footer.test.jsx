// Footer.test.jsx
import { render, screen } from '@testing-library/react';
import Footer from '../../../src/components/Shared/Footer';
import SocialIcon from '../../../src/components/Shared/SocialIcon';
import { describe, it, expect } from 'vitest';

vi.mock('../../../src/components/Shared/SocialIcon', () => {
  return {
    __esModule: true,
    default: ({ name, href, ...props }) => (
      <a href={href} {...props} data-testid={`icon-${name}`}>
        {name}
      </a>
    ), // Simplified mock
  };
});

describe('Footer', () => {
  it('renders the copyright text with the current year', () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);

    const copyrightText = screen.getByText(`© ${currentYear} My Company. All rights reserved.`);
    expect(copyrightText).toBeInTheDocument();
  });

  it('renders social icons when socialLinks prop is provided', () => {
    const socialLinks = [
      { name: 'linkedin', icon: 'linkedin', href: 'https://www.linkedin.com/in/myprofile' },
      { name: 'github', icon: 'github', href: 'https://github.com/myusername' },
    ];

    render(<Footer socialLinks={socialLinks} />);

    expect(screen.getByTestId('icon-linkedin')).toBeInTheDocument();
    expect(screen.getByTestId('icon-github')).toBeInTheDocument();
  });

  it('does not render social icons when socialLinks prop is not provided', () => {
    render(<Footer />);
    const socialIconsContainer = screen.queryByRole('div', { name: /social icons/i }); // Or some other query if you set a role on the div
    expect(socialIconsContainer).not.toBeInTheDocument();
  });

    it('applies the correct styling', () => {
        render(<Footer />);

        const footerElement = screen.getByRole('contentinfo'); // Check if the footer element has correct role
        expect(footerElement).toBeInTheDocument();
        expect(footerElement.classList.contains('bg-base-200')).toBe(true);
        expect(footerElement.classList.contains('p-4')).toBe(true);
        expect(footerElement.classList.contains('mt-8')).toBe(true);
      });
});
