import PropTypes from 'prop-types';

const IconButton = ({ children, onClick, title }) => {
  return (
    <button
      title={title}
      onClick={onClick}
      className="p-[0.4rem] transition bg-transparent text-zinc-800 dark:text-zinc-200 aspect-square rounded-lg dark:hover:bg-zinc-700 hover:bg-zinc-100 active:translate-y-px"
    >
      {children}
    </button>
  );
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default IconButton;