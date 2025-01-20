import { CardDetail, HomePage, HostDetail, HostLanding, Payment, SignInPage } from '../../pages';
import SignupForm from '../../pages/auth/Signup';

const authenticatedRoutes = [
  {
    key: 0,
    path: '/',
    element: HomePage,
  },
  {
    key: 1,
    path: '/card/:id',
    element: CardDetail,
  },
  {
    key: 2,
    path: '/host/:id',
    element: HostDetail,
  },
  {
    key: 3,
    path: '/host/landing',
    element: HostLanding,
  },
  {
    key: 4,
    path: '/login',
    element: SignInPage,
  },
  {
    key: 5,
    path: '/signup',
    element: SignupForm,
  },
  {
    key: 6,
    path: '/host/:id',
    element: HostDetail,
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
