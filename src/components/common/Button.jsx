import { cn } from "../../lib/utils";
import PropTypes from 'prop-types';

// Base styles applied to all button variants
const baseStyles =
  "transition select-none flex justify-center rounded-lg items-center gap-2 no-underline active:translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed";

// Visual style variations for different button purposes
const variants = {
  destructive:
    "bg-zinc-100 dark:bg-zinc-800 font-medium text-red-500 dark:text-red-400 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white dark:hover:text-white",
  secondary: "bg-white text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
  secondaryV2:
    "bg-zinc-50 dark:bg-zinc-900 font-medium text-zinc-800 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-950 border-2 border-dashed border-zinc-200 dark:border-zinc-800",
};

// Size variations to support different button use cases
const sizes = {
  compact: "px-4 py-2 text-sm",
  regular: "px-5 py-2.5 text-sm",
};

const Button = ({
  onClick,
  children,
  type = "button",
  variant = "secondary",
  size = "regular",
  className,
  disabled = false,
  shape, // shape prop
...props
}) => {
  const shapeClasses = shape? (shape === 'square'? '': shape === 'rounded'? 'rounded-md': shape === 'pill'? 'rounded-full': ''): '';
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(baseStyles, variants[variant], sizes[size], shapeClasses, className)} // Include shapeClasses
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func, // Make onClick optional
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["destructive", "secondary", "secondaryV2"]),
  size: PropTypes.oneOf(["compact", "regular"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  shape: PropTypes.oneOf(["square", "rounded", "pill"]), // Add shape prop type
};

export default Button;