import PropTypes from "prop-types";

const NotificationIcon = ({ notificationCount = 0, size = 'md', color = 'primary', className = '' }) => {
  
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
    <div className="indicator">
      <svg
        data-testid="notificationIcon"
        xmlns="http://www.w3.org/2000/svg"
        className={combinedClasses}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      {notificationCount > 0 && notificationCount < 100 && (
        <span role="status" className="badge badge-xs badge-primary indicator-item">
          {notificationCount}
        </span>
      )}
      {notificationCount >= 100 && (
        <span role="status" className="badge badge-xs badge-primary indicator-item">
          99+  {/* Display 99+ directly */}
        </span>
      )}
    </div>
    </>
  )
}

NotificationIcon.propTypes = {
  size: PropTypes.string
}

export default NotificationIcon;