// Icon.jsx
import React from 'react';

const SocialIcon = ({ name, href, ...props }) => {
  const iconClass = `fa fa-${name}`; // Assuming you're using Font Awesome
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        <i className={iconClass} aria-hidden="true"></i>
      </a>
    );
  } else {
    return (
      <i className={iconClass} aria-hidden="true" {...props}></i>
    );
  }
};

export default SocialIcon;