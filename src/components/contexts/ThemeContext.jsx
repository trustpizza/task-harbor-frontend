import React from "react";
import PropTypes from 'prop-types';

const ThemeContext = React.createContext({
  theme: "",
  toggleTheme: () => {},
});

ThemeContext.propTypes = {
  theme: PropTypes.string,
  toggleTheme: PropTypes.func,
};

export default ThemeContext;