import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200 dark:bg-base-300 p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-error mb-4">404</h1>
        <p className="text-2xl mb-4">Oops! The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="btn btn-primary text-white">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
