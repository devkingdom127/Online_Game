/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
import { useFormik } from 'formik';
import Cookie from 'js-cookie';
import get from 'lodash/get';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import ApiHelper from '../../data/ApiHelper';
import UsernameWallet from '../common/UsernameWallet';
import './EditAccount.css';

// eslint-disable-next-line no-unused-vars
const validate = (values) => {
    const errors = {};

    return errors;
};

export default function EditAccount(props) {
    const { match } = props;
    const { path } = match;
    const { state, dispatch } = useContext(AppContext);
    const [message, setMessage] = useState('');
    const { user } = state;

    const formik = useFormik({
        initialValues: {
            username: '',
            newUsername: '',
            password: '',
            newPassword: '',
            email: '',
        },
        onSubmit: (values) => {
            const data = {};
            let isValidEmail = true;
            const token = Cookie.get('token');
            const validProperties = ['newUsername', 'newPassword', 'email'];

            // eslint-disable-next-line no-restricted-syntax
            for (let key of Object.keys(values)) {
                if (validProperties.includes(key) && values[key] !== '') {
                    let convertedKey;
                    switch (key) {
                        case 'newUsername':
                            convertedKey = 'username';
                            break;
                        case 'newPassword':
                            convertedKey = 'password';
                            break;
                        case 'email':
                            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[key])) {
                                convertedKey = 'email';
                                isValidEmail = true;
                            } else {
                                setMessage('Invalid email address!');
                                isValidEmail = false;
                            }
                            break;
                        default:
                            break;
                    }

                    if (convertedKey) {
                        data[convertedKey] = values[key];
                    }
                }
            }

            const onSuccess = (response) => {
                const updatedUser = get(response, 'data', null);
                dispatch({ type: 'UPDATE_USER', user: updatedUser });
                setMessage('Account successfully updated!');
                formik.resetForm();
            };

            const onError = () => {
                setMessage('Something goes wrong!');
            };

            if (Object.keys(data).length > 0 && isValidEmail === true) {
                ApiHelper.user.update(data, user.id, token).then(onSuccess).catch(onError);
            } else {
                setMessage('Please provide the valid information you want to change');
            }
        },
    });

    const onLogout = () => {
        Cookie.remove('token');
        dispatch({ type: 'LOGOUT' });
        window.localStorage.setItem('logout', Date.now());
    };

    useEffect(() => {
        let timer;

        if (message) {
            timer = setTimeout(() => {
                setMessage('');
            }, 5000);
        }

        return () => clearTimeout(timer);
    }, [message]);

    return (
        <div className="page-content">
            <div className="page-top">EDIT ACCOUNT</div>
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
                <form onSubmit={formik.handleSubmit}>
                    <div className="check_out_top flex-s-c">
                        <div className="check_out_top-left">
                            <span>Your Name</span>
                            <input
                                className="check_out_input"
                                type="text"
                                name="username"
                                placeholder="Your name"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                            />
                        </div>
                        <div className="check_out_top-left">
                            <span>Change your name</span>
                            <input
                                className="check_out_input"
                                type="text"
                                name="newUsername"
                                placeholder="Your name"
                                onChange={formik.handleChange}
                                value={formik.values.newUsername}
                            />
                        </div>
                    </div>
                    <div className="check_out_top flex-s-c">
                        <div className="check_out_top-left">
                            <span>your password</span>
                            <input
                                className="check_out_input"
                                type="text"
                                name="password"
                                placeholder="your password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </div>
                        <div className="check_out_top-left">
                            <span>Change your password</span>
                            <input
                                className="check_out_input"
                                type="text"
                                name="newPassword"
                                placeholder="your password"
                                onChange={formik.handleChange}
                                value={formik.values.newPassword}
                            />
                        </div>
                    </div>
                    <div className="check_out_top flex-s-c">
                        <div className="check_out_top-left">
                            <span>Email</span>
                            <input
                                className="check_out_input"
                                type="text"
                                name="email"
                                placeholder="your@gmail.com"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </div>
                    </div>
                    <div className="cart-link-centr-total">
                        <button className="button_cart" type="submit">
                            confirm
                        </button>
                    </div>
                </form>
                {message ? (
                    <p style={{ color: '#00fcff', marginTop: 20, textAlign: 'center' }}>
                        {message}
                    </p>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
