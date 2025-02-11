
const LoadingIndicator = ({ size = 'md', color = 'primary', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  const colorClasses = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    accent: 'border-accent',
    neutral: 'border-neutral',
    info: 'border-info',
    success: 'border-success',
    warning: 'border-warning',
    error: 'border-error',
  };

  const combinedClasses = `animate-spin rounded-full border-2 border-t-transparent ${sizeClasses[size] || sizeClasses.md} ${colorClasses[color] || colorClasses.primary} ${className}`;

  return (
    <div className={combinedClasses} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingIndicator;
