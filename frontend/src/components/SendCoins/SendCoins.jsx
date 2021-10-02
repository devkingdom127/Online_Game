import Cookie from 'js-cookie';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import UsernameWallet from '../common/UsernameWallet';

export default function SendCoins(props) {
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    const { match } = props;
    const { path } = match;

    const onLogout = () => {
        Cookie.remove('token');
        dispatch({ type: 'LOGOUT' });
        window.localStorage.setItem('logout', Date.now());
    };

    return (
        <div className="page-content">
            <div className="page-top">SEND COINS</div>
            <div className="text-text">
                <div className="cart-user flex-s-c">
                    <UsernameWallet username={user.username} coin={user.coin} />
                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                    <span className="cart-user-exit a" onClick={onLogout} />
                </div>
                <div className="menu-news-n">
                    <div className="menu-news flex-s-c">
                        <li className={path === '/myaccount' ? 'active-news' : ''}>
                            <Link to="/myaccount" className="a">
                                Dashboard
                            </Link>
                        </li>
                        <li className={path === '/myaccount/orders' ? 'active-news' : ''}>
                            <Link to="/myaccount/orders" className="a">
                                My Orders
                            </Link>
                        </li>
                        <li className={path === '/myaccount/edit' ? 'active-news' : ''}>
                            <Link to="/myaccount/edit" className="a">
                                Edit Account
                            </Link>
                        </li>
                        <li className={path === '/myaccount/send-coins' ? 'active-news' : ''}>
                            <Link to="/myaccount/send-coins" className="a">
                                Send Coins
                            </Link>
                        </li>
                    </div>
                </div>
                <div className="check_out_top flex-s-c">
                    <div className="check_out_top-right">
                        <span>Full Name</span>
                        <input
                            className="check_out_input-r"
                            type="text"
                            name="text"
                            placeholder="Your name"
                        />
                    </div>
                    <div className="check_out_top-center">
                        send coins to:
                        <span className="check_out_top-center-span" />
                    </div>
                    <div className="check_out_top-right">
                        <span>other user</span>
                        <input
                            className="check_out_input-r"
                            type="text"
                            name="text"
                            placeholder="other user"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
