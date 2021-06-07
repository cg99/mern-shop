// not used

import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import useToken from "./useToken";


const AuthRoute = ({ component: Component, ...rest }: RouteProps) => {
    const { token, setToken } = useToken();
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
    }, []);

    if (!Component) return null;

    return (
        <Route
            {...rest}
            render={routeProps => (
                authorized ? <Component {...routeProps} /> : <Redirect to="/signin" />
            )}
        />
    );
}

export default AuthRoute;