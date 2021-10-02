import Cookie from 'js-cookie';
import get from 'lodash/get';
import React, { useContext, useEffect, useState } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import AvatarImg from '../../assets/images/ava-img.png';
import LogoSmall from '../../assets/images/logo-small.png';
import Logo from '../../assets/images/logo.png';
import { AppContext } from '../../context/AppContext';
import ApiHelper from '../../data/ApiHelper';
import './Header.css';

export default function Header() {
    const { state, dispatch } = useContext(AppContext);
    const { user, cart } = state;
    const location = useLocation();

    const [totalOnlinePlayers, setTotalOnlinePlayers] = useState(0);

    useEffect(() => {
        const fetchTotalOnlinePlayers = () => {
            const onSuccess = (response) => {
                const data = get(response, 'data.0.0', []);
                setTotalOnlinePlayers(data['']);
            };

            const onError = () => {
                setTotalOnlinePlayers(0);
            };

            ApiHelper.games.getTotalOnlinePlayers().then(onSuccess).catch(onError);
        };

        fetchTotalOnlinePlayers();
    }, []);

    // eslint-disable-next-line no-unused-vars
    const onLogout = () => {
        Cookie.remove('token');
        dispatch({ type: 'LOGOUT' });
        window.localStorage.setItem('logout', Date.now());
    };

    const totalCartItems = () => {
        const cartProducts = get(cart, 'products', []);
        const countableField = cartProducts.length !== 0 ? 'products' : 'packages';

        if (!Array.isArray(cart[countableField]) || cart[countableField].length === 0) return 0;
        let countItems = 0;
        cart[countableField].forEach((item) => {
            countItems += item.totalProductQuantity;
        });
        return countItems;
    };

    return (
        <header className="header">
            <div className="logo_small">
                <Link to="/">
                    <img src={LogoSmall} alt="" />
                </Link>
            </div>
            <div className="menu-top">
                <ul className="menu-top-left">
                    <li className={`${location.pathname === '/' ? 'active' : ''}`}>
                        <Link to="/" className="a">
                            Home
                        </Link>
                    </li>
                    <li className={`${location.pathname === '/news' ? 'active' : ''}`}>
                        <Link to="/news" className="a">
                            News
                        </Link>
                    </li>
                    <li className={`${location.pathname === '/media' ? 'active' : ''}`}>
                        <Link to="/media" className="a">
                            Media
                        </Link>
                        <ul>
                            <li>
                                <Link to="/forum" className="a">
                                    Forum
                                </Link>
                            </li>
                            <li>
                                <Link to="/registration" className="a">
                                    Registration
                                </Link>
                            </li>
                            <li>
                                <Link to="/facebook" className="a">
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link to="/discord" className="a">
                                    Discord
                                </Link>
                            </li>
                            <li>
                                <Link to="/youtube" className="a">
                                    Youtube
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul className="menu-top-right right-menu-top">
                    <li className={`${location.pathname === '/wiki' ? 'active' : ''}`}>
                        <Link to="/wiki" className="a">
                            Wiki
                        </Link>
                    </li>
                    <li
                        className={`${location.pathname === '/item-mall' ? 'active' : ''}`}
                        id="item-mall-link"
                    >
                        <Link to="/item-mall" className="a" id="item-mall-id">
                            Item Mall
                        </Link>
                    </li>
                    <li className={`${location.pathname === '/cart' ? 'active' : ''}`}>
                        <Link to="/cart" className="a">
                            <FiShoppingBag size={20} />
                            {totalCartItems()}
                        </Link>
                    </li>
                </ul>
                <div className="server-load">
                    <div className="circle-online">
                        <div className="serverInfo">
                            <span className="serverInfo__name">
                                TOTAL
                                <br />
                                ONLINE
                            </span>
                            <span className="serverInfo__online">{totalOnlinePlayers}</span>
                        </div>
                        <div
                            className="circlestat"
                            data-dimension="112"
                            data-width="4"
                            data-fontsize="12"
                            data-percent="65"
                            data-fgcolor="#45e99d"
                            data-bgcolor="rgba(15, 33, 29, 0.9)"
                        />
                    </div>
                </div>
            </div>
            <div className="topPanel__buttons" style={{ display: user ? 'none' : '' }}>
                <a href="#login-login" className="open_modal button">
                    Log In
                </a>
            </div>
            {user ? (
                <div className="accBlock" style={{ display: user ? '' : 'none' }}>
                    <div className="avatar">
                        <Link to="/myaccount" className="a">
                            <img src={AvatarImg} alt="" />
                            <span>{user.username}</span>
                        </Link>
                    </div>
                    <div className="acc-out">
                        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                        <span className="a" onClick={onLogout} aria-hidden="true" />
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div className="logo">
                <Link to="/">
                    <img src={Logo} alt="" />
                </Link>
            </div>
            <div className="sparks-sparks">
                <div className="sparks sparks-1" />
                <div className="sparks sparks-2" />
                <div className="sparks sparks-3" />
            </div>
        </header>
    );
}
