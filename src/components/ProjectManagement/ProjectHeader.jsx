import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import HamburgerMenu from "../Shared/HamburgerMenu";
import SearchIcon from '../Shared/SearchIcon';
import NotificationIcon from '../Shared/NotificationIcon';

const ProjectHeader = ({ title, links = [] }) => {
  return (
    <div className="navbar bg-base-100 dark:bg-base-200 shadow-md p-6">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <HamburgerMenu />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 dark:bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              {links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.text}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <h1 className="btn btn-ghost text-xl underline text-base-content dark:text-base-content">{title}</h1>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <SearchIcon />
        </button>
        <button className="btn btn-ghost btn-circle">
          <NotificationIcon />
        </button>
      </div>
    </div>
  );
};

ProjectHeader.propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
}

export default ProjectHeader;

