import HomePage from '@/components/pages/HomePage';

export const routes = {
  home: {
    id: 'home',
    label: 'Tasks',
    path: '/',
    icon: 'CheckSquare',
component: HomePage
  }
};

export const routeArray = Object.values(routes);