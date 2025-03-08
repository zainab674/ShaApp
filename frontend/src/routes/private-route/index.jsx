import React from 'react'

import { ContactSection, HomePage, Notifications, Private } from '../../pages';
import { CardDetail } from '../../pages';
import { HostDetail } from '../../pages';
import { Payment } from '../../pages';
import { ProfilePage } from '../../pages';
import Dashboard from '../../pages/dashboard/dashboard';

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
        path: '/payment/:id',
        element: Payment,
    },

    {
        key: 5,
        path: '/profile/me',
        element: ProfilePage,
    },
    {
        key: 6,
        path: '/notifications',
        element: Notifications,
    },
    {
        key: 7,
        path: '/dashboard',
        element: Dashboard,
    },
    {
        key: 7,
        path: '/chat/:id',
        element: Private,
    },
    {
        key: 8,
        path: '/contact',
        element: ContactSection,
    },
    {
        key: 9,
        path: '/profile/:id',
        element: ProfilePage,
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