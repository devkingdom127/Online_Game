import { useFormik } from 'formik';
import $ from 'jquery';
import Cookie from 'js-cookie';
import get from 'lodash/get';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import ApiHelper from '../../data/ApiHelper';
import Cart from '../../data/Cart';
import './Login.css';

const validate = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Please provide your username or your e-mail.';
    }

    if (!values.password) {
        errors.password = 'Please provide your password.';
    }

    return errors;
};

export default function Login() {
    const close = useRef();
    const closeFunc = useRef();
    const [isBusy, setIsBusy] = useState(false);
    const [error, setError] = useState({
        invalid: '',
    });
    const { dispatch } = useContext(AppContext);
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate,
        onSubmit: (values) => {
            setIsBusy(true);
            const credentials = {
                identifier: values.username,
                password: values.password,
            };

            const onSuccessLogin = (response) => {
                const jwt = get(response, 'data.jwt', '');
                Cookie.set('token', jwt);

                const onSuccessUser = (responseUser) => {
                    const user = get(responseUser, 'data', null);
                    const cartId = get(user, 'cart', '');

                    const onSuccessCart = (responseCart) => {
                        const data = get(responseCart, 'data', {});
                        let cart = get(responseCart, 'data.cartDetails', new Cart(data.id));
                        if (typeof cart === 'string') {
                            cart = JSON.parse(cart);
                        }
                        dispatch({ type: 'AUTH_SUCCESS', user, cart });
                    };

                    const onErrorCart = () => {};

                    ApiHelper.carts.getCart(cartId, jwt).then(onSuccessCart).catch(onErrorCart);
                };

                const onErrorUser = () => {
                    dispatch({ type: 'AUTH_FAIL' });
                    Cookie.remove('token');
                };

                ApiHelper.user.getMe(jwt).then(onSuccessUser).catch(onErrorUser);
                closeFunc.current();
            };

            const onErrorLogin = (err) => {
                const message = get(
                    err,
                    'response.data.message[0].messages[0].message',
                    'error in credentials'
                );

                const isInvalid = message.includes('invalid');

                if (isInvalid) {
                    setError({ invalid: message });
                } else {
                    setError({ invalid: '' });
                }
            };

            if (!isBusy) {
                ApiHelper.user
                    .login(credentials)
                    .then(onSuccessLogin)
                    .catch(onErrorLogin)
                    .finally(() => setIsBusy(false));
            }
        },
    });

    useEffect(() => {
        $(document).ready(() => {
            const overlay = $('#overlay');
            // const openModal = $('.open_modal');
            close.current = $('.modal_close, #overlay');
            const modal = $('.modal_div');

            closeFunc.current = () => {
                // eslint-disable-next-line func-names
                modal.animate({ opacity: 0, top: '45%' }, 200, function () {
                    $(this).css('display', 'none');
                    overlay.fadeOut(400);
                });

                formik.resetForm();
                setIsBusy(false);
                setError({ invalid: '' });
            };

            // eslint-disable-next-line func-names
            // openModal.click(function (event) {
            //     event.preventDefault();
            //     const div = $(this).attr('href');
            //     overlay.fadeIn(400, () => {
            //         $(div).css('display', 'block').animate({ opacity: 1, top: '25%' }, 200);
            //     });
            // });

            close.current.click(closeFunc.current);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="modal-content">
            <h2>
                <span>Login</span>
            </h2>
            <form onSubmit={formik.handleSubmit}>
                {error.invalid ? (
                    <>
                        <span className="color-red">Error! {error.invalid}</span>
                        <div style={{ height: 20 }} />
                    </>
                ) : (
                    <></>
                )}
                <div
                    className={`${
                        formik.errors.username && formik.touched.username ? 'formGroup' : ''
                    }`}
                >
                    <p>
                        <input
                            className="input-re_1"
                            type="text"
                            name="username"
                            placeholder="USERNAME"
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />
                    </p>
                    {formik.errors.username && formik.touched.username ? (
                        <div className="errorGroup">
                            <span className="color-red">Error!</span> {formik.errors.username}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div
                    className={`${
                        formik.errors.password && formik.touched.password ? 'formGroup' : ''
                    }`}
                >
                    <p>
                        <input
                            className="input-re_2"
                            type="password"
                            name="password"
                            placeholder="PASSWORD"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                    </p>
                    {formik.errors.password && formik.touched.password ? (
                        <div className="errorGroup">
                            <span className="color-red">Error!</span> {formik.errors.password}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="formButton">
                    <button className="button" type="submit">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}
