import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import {
  AuthorizeWrapper,
  PrivateRoutes,
  PublicRoutes,
} from './routes';
import { useAuth } from './authContext';
import { ToastContainer } from 'react-toastify';
function App() {
  const { token } = useAuth();

  function renderRoutes() {
    if (token) {
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          {PrivateRoutes.map(({ path, element, key }) => (
            <Route key={key} exact path={path} element={<AuthorizeWrapper />}>
              <Route key={key + 1} exact path={path} element={element} />
            </Route>
          ))}
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          {PublicRoutes.map(({ path, element, key }) => (
            <Route key={key} exact path={path} element={element} />
          ))}
        </Routes>
      );
    }
  }
  return <Router>
    {renderRoutes()}
    <ToastContainer position="top-right" autoClose={3000} />
  </Router>;



}

export default App;


// const App = () => <h1>App Component Works</h1>;
// export default App;
