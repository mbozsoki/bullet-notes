import React, { ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUser } from 'reactfire';

type Props = {
    children: ReactNode;
    [key: string]: string | number | object | ReactNode;
};

export const PrivateRoute = ({ children, ...rest }: Props) => {
    const { data: user } = useUser();
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
};
