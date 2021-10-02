import React from 'react';
import { Route, useLocation } from 'react-router-dom';
import TopGuilds from '../components/TopGuilds/TopGuilds';
import TopPets from '../components/TopPets/TopPets';
import TopPlayers from '../components/TopPlayers/TopPlayers';
import ProtectedRoute from './ProtectedRoute';

export default function CommonRoute(props) {
    const { isProtected } = props;
    const location = useLocation();

    const isWikiPath = location.pathname === '/wiki';

    return (
        <>
            {isWikiPath ? (
                <></>
            ) : (
                <div className="container-home-left">
                    <TopPlayers />
                    <TopPets />
                    <TopGuilds />
                </div>
            )}

            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {isProtected ? <ProtectedRoute {...props} /> : <Route {...props} />}
        </>
    );
}
