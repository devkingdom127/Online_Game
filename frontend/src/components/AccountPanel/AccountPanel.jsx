import Cookie from 'js-cookie';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BackgroundCharacter1 from '../../assets/images/bg-character-img-1.png';
import BackgroundCharacter2 from '../../assets/images/bg-character-img-2.png';
import { AppContext } from '../../context/AppContext';
import UsernameWallet from '../common/UsernameWallet';
import './AccountPanel.css';

export default function AccountPanel(props) {
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
            <div className="page-top">ACCOUNT PANEL</div>
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
                <div className="block-character flex-s-c">
                    <div className="bg-character">
                        <div className="title-character">YOUR CHARACTER</div>{' '}
                        <img src={BackgroundCharacter1} alt="" />
                        <div className="container">
                            <div className="dropdown">
                                <div className="dropdown-menu">
                                    <p className="dropdown-menu-center">
                                        The details to characterr
                                    </p>
                                    <p className="dropdown-menu-bottom">
                                        The orders you made for this character.The orders you made
                                        for this character
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-character">
                        <div className="title-character">YOUR CHARACTER</div>{' '}
                        <img src={BackgroundCharacter2} alt="" />
                        <div className="container">
                            <div className="dropdown">
                                <div className="dropdown-menu">
                                    <p className="dropdown-menu-center">
                                        The details to characterr
                                    </p>
                                    <p className="dropdown-menu-bottom">
                                        The orders you made for this character.The orders you made
                                        for this character
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
