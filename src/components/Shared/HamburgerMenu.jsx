import PropTypes from "prop-types";

const HamburgerMenu = ({ size = 'md', color = 'primary', className = '' }) => {
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  const colorClasses = {
    primary: 'primary',
    secondary: 'secondary',
    accent: 'accent',
    neutral: 'neutral',
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
  };

  const combinedClasses = `${sizeClasses[size] || sizeClasses.md} ${colorClasses[color] || colorClasses.primary} ${className}`;

  return (
    <>
    <svg
      data-testid="hamburgerMenu"
      xmlns="http://www.w3.org/2000/svg"
      className={combinedClasses}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h7" />
    </svg>
    </>
  )
}

HamburgerMenu.propTypes = {
  size: PropTypes.string
}

export default HamburgerMenu;