import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUser } from 'reactfire';

export function PrivateRoute({ children, ...rest }: any) {
    const { data: user } = useUser();
    console.log({ user });
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
