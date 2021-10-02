/* eslint-disable no-unused-vars */
import Cookie from 'js-cookie';
import get from 'lodash/get';
import React, { useContext, useEffect, useState } from 'react';
import PriceIcon from '../../assets/images/price-icon.png';
import { AppContext } from '../../context/AppContext';
import ApiHelper from '../../data/ApiHelper';
import Cart from '../../data/Cart';
import UsernameWallet from '../common/UsernameWallet';
import PayPalButton from '../PayPalButton/PayPalButton';
import './CheckOut.css';

export default function CheckOut() {
    const { state, dispatch } = useContext(AppContext);
    const [error, setError] = useState('');
    const [isBusy, setIsBusy] = useState(false);
    const [isChecked, setIsChecked] = useState(true);
    const { user, cart } = state;
    const cartId = get(cart, 'id', '');
    const coupon = get(cart, 'coupon', '');
    const products = get(cart, 'products', []);
    const packages = get(cart, 'packages', []);
    const [selectedField] = useState(products.length > 0 ? 'products' : 'packages');
    const [characterNames, setCharacterNames] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const subtotal = get(cart, 'totalCartPrice', 0);
    const [total, setTotal] = useState(() => {
        if (coupon) {
            return Number(cart.totalPriceAfterCoupon);
        }
        return subtotal;
    });
    // const subtotal = get(cart, 'totalCartPrice', 0);

    useEffect(() => {
        setTotal(coupon ? Number(cart.totalPriceAfterCoupon) : subtotal);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subtotal]);

    useEffect(() => {
        const onSuccess = (response) => {
            const data = get(response, 'data', []);
            setCharacterNames(data);
        };

        const onError = () => {};

        ApiHelper.characterNames.getCharacterNames().then(onSuccess).catch(onError);
    }, []);

    const onCheckout = () => {
        if (isBusy || cart[selectedField].length <= 0 || !isChecked) return;
        if (user.coin < cart.totalCartPrice) {
            setError(
                'You do not have enough coin to place order. Please buy coins from the Item Mall.'
            );
            return;
        }
        if (selectedField === 'products' && selectedOption === '') return;
        setIsBusy(true);
        const token = Cookie.get('token');
        const reports = '';

        const data = {
            CharacterName: selectedField === 'products' ? selectedOption : '',
            OrderDetails: cart,
            Coupon: coupon,
            user_id: user.id,
        };

        const onSuccessOrder = (response) => {
            const updatedCart = new Cart(cartId);
            const updatedCoin =
                user.coin * 1 -
                (cart.totalPriceAfterCoupon ? cart.totalPriceAfterCoupon : cart.totalCartPrice);
            const updateData = {
                coin: updatedCoin,
            };

            const onSuccessUserUpdate = (responseUserUpdate) => {
                const updatedUser = get(responseUserUpdate, 'data', null);
                dispatch({ type: 'UPDATE_USER', user: updatedUser });
            };

            const onErrorUserUpdate = () => {};

            const onSuccessCartUpdate = (responseCart) => {
                const cartData = get(response, 'data', {});
                const cartDetails = get(cartData, 'cartDetails', []);
                dispatch({ type: 'UPDATE_CART', updatedCart });
                setSelectedOption('');
            };

            const onErrorCartUpdate = () => {};

            ApiHelper.carts
                .updateCart(cartId, { cartDetails: JSON.stringify(updatedCart) }, token)
                .then(onSuccessCartUpdate)
                .catch(onErrorCartUpdate);
            ApiHelper.user
                .update(updateData, user.id, token)
                .then(onSuccessUserUpdate)
                .catch(onErrorUserUpdate);
        };

        const onErrorOrder = () => {};

        const onFinish = () => {
            setIsBusy(false);
        };

        ApiHelper.orders
            .createOrder(data, token)
            .then(onSuccessOrder)
            .catch(onErrorOrder)
            .finally(onFinish);
    };

    const ErrorMessage = error ? <p style={{ marginTop: 50, color: '#00fcff' }}>{error}</p> : <></>;

    const CartProductsItems = () => {
        if (cart[selectedField].length <= 0) return <></>;
        const items = cart[selectedField].map((item) => (
            <div className="cart-Block-bottom-bt flex-s-c">
                <div className="cart-subtotal">
                    {item.name} x {item.totalProductQuantity}
                </div>
                <div className="cart-total">
                    {selectedField === 'packages'
                        ? `$${Number(item.totalProductPrice).toFixed(2)}`
                        : `${item.totalProductPrice}`}
                </div>
                {/* <div className="cart-Table-close" /> */}
            </div>
        ));
        return items;
    };

    return (
        <div className="page-content">
            <div className="page-top">Check out</div>
            <div className="text-text">
                <div className="cart-user">
                    <UsernameWallet username={user.username} coin={user.coin} />
                </div>

                {selectedField === 'products' ? (
                    <div className="check_out_character">
                        <span>Character name</span>
                        <form>
                            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                            <select
                                id="server"
                                onChange={(event) => setSelectedOption(event.target.value)}
                                value={selectedOption}
                            >
                                <option value="">Select Character name</option>
                                {characterNames.length > 0 ? (
                                    characterNames.map((item) => (
                                        <option value={item.Name}>{item.Name}</option>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </select>
                        </form>
                    </div>
                ) : (
                    <></>
                )}
                <div className="cart-Block-bottom">
                    <div className="cart-Block-bottom-title">CART TOTALS</div>
                    <div className="cart-Block-bottom-bt-top flex-s-c total-section">
                        <div className="cart-subtotal">PRODUCT</div>
                        <div className="cart-total-img">
                            {selectedField === 'packages' ? <img src={PriceIcon} alt="" /> : <></>}
                            TOTAL
                        </div>
                    </div>
                    {CartProductsItems()}
                    <div className="cart-Block-bottom-bt flex-s-c">
                        <div className="cart-subtotal">Subtotal</div>
                        <div className="cart-total">
                            {selectedField === 'packages'
                                ? `$${Number(subtotal).toFixed(2)}`
                                : `${subtotal}`}
                        </div>
                    </div>
                    <div className="cart-Block-bottom-bt flex-s-c">
                        <div className="cart-subtotal">Total</div>
                        <div className="cart-total">
                            {selectedField === 'packages'
                                ? `$${Number(total).toFixed(2)}`
                                : `${total}`}
                        </div>
                    </div>

                    {cart[selectedField].length <= 0 ? (
                        <>
                            <p className="agree">
                                {' '}
                                Your cart is empty. Please add items from the Item Mall.
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="agree">
                                {' '}
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {
                                        setIsChecked(!isChecked);
                                    }}
                                />{' '}
                                I have read and agree for the Terms and conditions{' '}
                            </p>
                            <div className="cart-link-centr-total">
                                {selectedField === 'products' ? (
                                    <>
                                        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                                        <span
                                            href="/"
                                            className="button_cart a"
                                            onClick={onCheckout}
                                        >
                                            Place Order
                                        </span>
                                    </>
                                ) : (
                                    <PayPalButton setIsBusy={setIsBusy} />
                                )}
                            </div>
                        </>
                    )}
                    {ErrorMessage}
                </div>
            </div>
        </div>
    );
}
