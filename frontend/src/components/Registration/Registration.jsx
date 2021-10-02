/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik';
import $ from 'jquery';
import Cookie from 'js-cookie';
import get from 'lodash/get';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import ApiHelper from '../../data/ApiHelper';
import Cart from '../../data/Cart';
import './Registration.css';

const validate = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Please provide your username.';
    }

    if (!values.password) {
        errors.password = 'Please provide your password.';
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password.';
    } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Please provide correct confirm password.';
    }

    if (!values.email) {
        errors.email = 'Please provide your e-mail.';
    }

    if (!values.checkAgreement) {
        errors.checkAgreement = 'Please check the game rules';
    }

    return errors;
};

export default function Registration() {
    // const history = useHistory();
    const close = useRef();
    const closeFunc = useRef();
    const [isBusy, setIsBusy] = useState(false);
    const [error, setError] = useState({
        invalid: '',
    });
    const [usersInfo, setUsersInfo] = useState([]);
    const [usernameInput, setUsernameInput] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isRegistrationDone, setIsRegistrationDone] = useState(false);

    const { dispatch, setShowPostRegMessage, setPostRegMessage } = useContext(AppContext);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            checkAgreement: false,
        },
        validate,
        onSubmit: (values) => {
            setIsBusy(true);
            const credentials = {
                username: values.username,
                password: values.password,
                confirmPassword: values.confirmPassword,
                email: values.email,
            };

            const onSuccessRegister = (response) => {
                const jwt = get(response, 'data.jwt', '');
                const username = get(response, 'data.user.username', '');
                const email = get(response, 'data.user.email', '');

                Cookie.set('token', jwt);
                setShowPostRegMessage(true);
                setPostRegMessage(
                    `Hi ${username}, Thank you for joining XiahLegends, Please check at your ${email} that you get a new email from us with a verification link to be able to login to the launcher and play the game.`
                );

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

                const onErrorUser = (userError) => {
                    dispatch({ type: 'AUTH_FAIL' });
                    Cookie.remove('token');
                    closeFunc.current();
                };

                ApiHelper.user.getMe(jwt).then(onSuccessUser).catch(onErrorUser);
                closeFunc.current();
            };

            const onErrorRegister = (err) => {
                const message = get(
                    err,
                    'response.data.message[0].messages[0].message',
                    'error in credentials'
                );
                const isInvalid = message.includes('taken');
                setShowPostRegMessage(true);
                setPostRegMessage(message);

                if (isInvalid) {
                    setError({ invalid: message });
                } else {
                    setError({ invalid: '' });
                }
                closeFunc.current();
            };

            if (!isBusy) {
                ApiHelper.user
                    .register(credentials)
                    .then(onSuccessRegister)
                    .catch(onErrorRegister)
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
                formik.resetForm();
                setError({ invalid: '' });
                setIsBusy(false);
                setUsernameInput('');
                setUsernameError('');
                setEmailInput('');
                setEmailError('');

                // eslint-disable-next-line func-names
                modal.animate({ opacity: 0, top: '45%' }, 200, function () {
                    $(this).css('display', 'none');
                    overlay.fadeOut(400);
                });
            };

            close.current.click(closeFunc.current);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkAvailability = (field) => {
        const inputValue = field === 'username' ? usernameInput : emailInput;
        if (!inputValue) return;

        const onSuccess = (response) => {
            const isExist = get(response, 'data', false);
            if (isExist) {
                if (field === 'username') {
                    setUsernameError('username already exist');
                } else {
                    setEmailError('email already exist');
                }
            } else if (field === 'username') {
                if (usernameError) {
                    setUsernameError('');
                }
            } else if (emailError) {
                setEmailError('');
            }
        };

        const onError = () => {};

        const data = {
            key: field,
            value: inputValue,
        };

        ApiHelper.isExist(data).then(onSuccess).catch(onError);
    };

    useEffect(() => {
        checkAvailability('username');
    }, [usernameInput]);

    useEffect(() => {
        checkAvailability('email');
    }, [emailInput]);

    const PopUpMessage = () => (
        <p>
            Hi $username, Thank you for joining XiahLegends, Please check at your $email that you
            get a new email from us with a verification link to be able to login to the launcher and
            play the game
        </p>
    );

    return (
        <div className="modal-content">
            <h2>
                <span>Registration</span>
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
                        (formik.errors.username && formik.touched.username) || usernameError
                            ? 'formGroup'
                            : ''
                    }`}
                >
                    <p>
                        <input
                            className="input-re_1"
                            type="text"
                            name="username"
                            placeholder="USERNAME"
                            onChange={(event) => {
                                setUsernameInput(event.target.value);
                                formik.handleChange(event);
                            }}
                            value={formik.values.username}
                        />
                    </p>
                    {(formik.errors.username && formik.touched.username) || usernameError ? (
                        <div className="errorGroup">
                            {formik.errors.username ? (
                                <>
                                    <span className="color-red">Error!</span>{' '}
                                    {formik.errors.username}
                                </>
                            ) : (
                                <>
                                    <span className="color-red" />
                                    {usernameError}
                                </>
                            )}
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
                <div
                    className={`${
                        formik.errors.confirmPassword && formik.touched.confirmPassword
                            ? 'formGroup'
                            : ''
                    }`}
                >
                    <p>
                        <input
                            className="input-re_2"
                            type="password"
                            name="confirmPassword"
                            placeholder="CONFIRM PASSWORD"
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                        />
                    </p>
                    {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
                        <div className="errorGroup">
                            <span className="color-red">Error!</span>{' '}
                            {formik.errors.confirmPassword}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div
                    className={`${
                        (formik.errors.email && formik.touched.email) || emailError
                            ? 'formGroup'
                            : ''
                    }`}
                >
                    <p>
                        <input
                            className="input-re_3"
                            type="text"
                            name="email"
                            placeholder="EMAIL"
                            onChange={(event) => {
                                setEmailInput(event.target.value);
                                formik.handleChange(event);
                                checkAvailability('username');
                            }}
                            value={formik.values.email}
                        />
                    </p>
                    {(formik.errors.email && formik.touched.email) || emailError ? (
                        <div className="errorGroup">
                            {formik.errors.email ? (
                                <>
                                    <span className="color-red">Error!</span> {formik.errors.email}
                                </>
                            ) : (
                                <>
                                    <span className="color-red" />
                                    {emailError}
                                </>
                            )}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div
                    className={`${
                        formik.errors.checkAgreement && formik.touched.checkAgreement
                            ? 'formGroup check'
                            : ''
                    }`}
                >
                    <p className="agree">
                        <input
                            type="checkbox"
                            name="checkAgreement"
                            onChange={formik.handleChange}
                            value={formik.values.checkAgreement}
                        />{' '}
                        I have read agree to the Xiah of Service and Etiquette Policy.
                        <a href="/">Game rules.</a>
                    </p>
                    {formik.errors.checkAgreement && formik.touched.checkAgreement ? (
                        <div className="errorGroup">
                            <span className="color-red">Error!</span> {formik.errors.checkAgreement}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="formButton">
                    <button className="button" type="submit">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
}
