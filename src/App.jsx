import routes from './routes/routes.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes);

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;