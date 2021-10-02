import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function ProtectedRoute(props) {
    const { state } = useContext(AppContext);
    const { user } = state;

    if (!user) {
        return <Redirect to="/" />;
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Route {...props} />;
}
