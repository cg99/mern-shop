import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import useToken from '../../helpers/useToken';

const Auth = (props: { component: React.ReactNode; }) => {

    const { token, setToken } = useToken();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const source = Axios.CancelToken.source();

        if (!token) {
            setRedirect(true);
        }
        
        Axios.get('/api/auth', { headers: { 'Authorization': `Bearer ${JSON.stringify(token)}` }, cancelToken: source.token })
            .then(res => {
                if (res.data.success === true) {
                    setRedirect(false)
                } else {
                    setToken(null)
                    setRedirect(true)
                };
            })
            .catch(err => console.log(err));

        return () => {
            source.cancel("Request done")
        }
        // eslint-disable-next-line
    }, [])


    if (!redirect) {
        return <> {props.component} </>
    }

    if (redirect) {
        return <Redirect to="/signin" />
    }

    return (
        <div>
            {props.component}
        </div>
    )
}

export default Auth
