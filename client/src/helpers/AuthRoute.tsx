// using

import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import useToken from "./useToken";


const AuthRoute = ({ children, ...rest }: RouteProps) => {
    const { token, setToken } = useToken();
    const source = Axios.CancelToken.source();

    const [loading, setLoading] = useState(false);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        setLoading(true);
        Axios.get('api/auth', { // user authorization 
            headers: {
                'Authorization': `Bearer ${JSON.stringify(token)}`
            }
        }).then(res => {
            if (res.data.success) {
                setAuthorized(true);
            } else {
                setAuthorized(false);
                setToken(null);
            }
            setLoading(false);
        }).catch(err => console.log(err));

    }, []);

    return (
        <Route
            {...rest}
            render={() => (
                !loading && authorized ? children : <Redirect to="/signin" />
            )}
        />
    );
}

export default AuthRoute;