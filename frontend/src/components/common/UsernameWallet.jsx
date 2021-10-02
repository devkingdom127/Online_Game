import React from 'react';

export default function UsernameWallet(props) {
    const { username, coin } = props;
    return (
        <div className="price-coin-user">
            <span className="user-name">{username} wallet:</span> {coin}
            <i className="price-icon-user" />
        </div>
    );
}
