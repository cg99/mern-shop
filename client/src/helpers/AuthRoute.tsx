import Axios from "axios";
import React, { useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import useToken from "./useToken";


const AuthRoute = ({ component: Component, ...rest }: RouteProps) => {
    const { token, setToken } = useToken();
    const source = Axios.CancelToken.source();

    useEffect(() => {
        Axios.get('api/auth', { // user authorization 
            headers: {
                'Authorization': `Bearer ${JSON.stringify(token)}`
            }
        }).then(res => {
            if (res.data.success === false) {
                setToken(null);
                <Redirect to="/signin" />;
                console.log('why motherfucker')
            }
        }).catch(err => console.log(err));

        return () => {
            source.cancel("Request done")
        }
    }, [setToken, source, token]);

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

export default AuthRoute;