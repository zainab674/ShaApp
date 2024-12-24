import { SignInPage } from '../../pages';
import SignupForm from '../../pages/auth/Signup';

const authenticatedRoutes = [

  {
    key: 5,
    path: '/login',
    element: SignInPage,
  },
  {
    key: 6,
    path: '/signup',
    element: SignupForm,
  },

];

function withNavigationWatcher(Component, path) {
  const WrappedComponent = function (props) {
    return <Component {...props} />;
  };
  return <WrappedComponent />;
}
export default authenticatedRoutes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
