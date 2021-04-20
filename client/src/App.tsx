// import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// pages
import Main from './components/pages/Main';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import Profile from './components/pages/Profile';
import Products from './components/pages/Products';
import Page404 from './components/pages/Page404';
import Cart from './components/pages/Cart';
import Recipes from './components/pages/Recipes';
import Product from './components/pages/Product';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import useToken from './helpers/useToken';
import Axios from 'axios';
import { useEffect } from 'react';

const AuthRoute = ({ component: Component, ...rest }: RouteProps) => { // this has yet to be implemented properly
  const { token, setToken } = useToken();

  useEffect(() => {
    Axios.get('/api/auth', { // user authorization 
      headers: {
        'Authorization': `Bearer ${JSON.stringify(token)}`
      }
    }).then(res => {
        if (res.data.success !== true) {
          setToken(null);
          <Redirect to="/signin" />
        }
      })
      .catch(err => console.log(err));
  }, []);

  if (!Component) return null;

  return (
    <Route
      {...rest}
      render={routeProps => (
        token ? <Component {...routeProps} /> : <Redirect to="/signin" />
      )}
    />
  );
}

function App() {

  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <AuthRoute path="/profile" component={Profile} />
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <AuthRoute path="/recipes" component={Recipes} />
          <Route component={Page404} />
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

/*
Color Scheme
#F4F3F2 bg white
#C0A9BD purple
#94A7AE blue
#64766A green
*/

export default App;
