// Header.jsx
import React from 'react';

const Header = ({ title }) => {
  return (
    <header className="bg-base-100 shadow-lg p-4"> {/* Tailwind classes */}
      <div className="container mx-auto"> {/* Center content */}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
    </header>
  );
};

export default Header;