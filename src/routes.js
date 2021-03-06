import React from 'react';
import Home from './pages/Home/Home';
import InGame from './pages/InGame/InGame';
// import NotFound from './components/NotFound/NotFound';

const routes = [
    { path: '/', exact: true, component:() => <Home /> },
    { path: '/:level', exact: true, component: ({ match }) => <InGame match={match} /> },
    // { path: '*', exact: false, component: () => <NotFound /> }
]

export default routes;