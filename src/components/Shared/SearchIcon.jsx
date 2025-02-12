import PropTypes from "prop-types";

const SearchIcon = ({ size = 'md', color = 'primary', className = '' }) => {
  
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
      data-testid="searchIcon"
      xmlns="http://www.w3.org/2000/svg"
      className={combinedClasses}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    </>
  )
}

SearchIcon.propTypes = {
  size: PropTypes.string
}

export default SearchIcon;