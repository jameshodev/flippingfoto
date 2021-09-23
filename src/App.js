import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import useAuthListener from './hooks/use-auth-listener';
import UserContext from './context/user';

const Login = lazy(() => import('./pages/login'));
const Signup = lazy(() => import('./pages/sign-up'));
const NotFound = lazy(() => import('./pages/not-found'));
const Dashboard = lazy(() => import('./pages/dashboard'));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading ... </p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={Signup} />
            <Route path={ROUTES.DASHBOARD} component={Dashboard} />
            {/* path is empy so any pages that are not recognized will be shown not found component */}
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

// import { lazy, Suspense } from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// // import ReactLoader from './components/loader';
// import * as ROUTES from './constants/routes';
// import UserContext from './context/user';
// import useAuthListener from './hooks/use-auth-listener';

// // import ProtectedRoute from './helpers/protected-route';

// const Login = lazy(() => import('./pages/login'));
// const SignUp = lazy(() => import('./pages/sign-up'));
// // const Dashboard = lazy(() => import('./pages/dashboard'));
// // const Profile = lazy(() => import('./pages/profile'));
// const NotFound = lazy(() => import('./pages/not-found'));

// export default function App() {
//   const { user } = useAuthListener();

//   return (
//     <UserContext.Provider value={{ user }}>
//       <Router>
//         <Suspense fallback={<p>Loading ... </p>}>
//           <Switch>
//             <Route path={ROUTES.LOGIN} component={Login} />
//             <Route path={ROUTES.SIGN_UP} component={SignUp} />
//             {/* <Route path={ROUTES.PROFILE} component={Profile} />
//             <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
//               <Dashboard />
//             </ProtectedRoute> */}
//             <Route component={NotFound} />
//           </Switch>
//         </Suspense>
//       </Router>
//     </UserContext.Provider>
//   );
// }
