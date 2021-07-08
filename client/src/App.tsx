import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// pages
import Main from "./components/pages/Main";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Profile from "./components/pages/Profile";
import Products from "./components/pages/Products";
import Page404 from "./components/pages/Page404";
import Cart from "./components/pages/Cart";
import Recipes from "./components/pages/Recipes";
import Product from "./components/pages/Product";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

//authentication
import AuthRoute from "./helpers/AuthRoute";
import useToken from "./helpers/useToken";
import { useEffect, useState } from "react";
import Axios from "axios";
import Admin from "./components/pages/Admin";

function App() {
  const { token } = useToken();
  const source = Axios.CancelToken.source();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    Axios.get('api/auth', { // user authorization 
      headers: {
        'Authorization': `Bearer ${JSON.stringify(token)}`
      }
    }).then(res => res.data.success ? setAuthorized(true) : setAuthorized(false))
      .catch(err => console.log(err));

    return () => {
      source.cancel("Request done")
    }
  }, [token, source]);

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

          <Route path="/products">
            <Products />
          </Route>
          <Route path="/product/:id">
            <Product />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>

          <Route path="/admin">
            <Admin />
          </Route>


          <AuthRoute path="/profile">
            <Profile />
          </AuthRoute>

          <Route path="/recipes">
            <Recipes />
          </Route>


          <Route component={Page404} />

        </Switch>

        <Footer />
      </div>
    </Router>
  );
}



export default App;

// https://github.com/daryanka/typescript-with-redux
