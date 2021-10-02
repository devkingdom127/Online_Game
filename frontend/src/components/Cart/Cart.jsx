/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import Cookie from 'js-cookie';
import get from 'lodash/get';
import head from 'lodash/head';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import ApiHelper from '../../data/ApiHelper';
import ENV from '../../utilities/environment';
import UsernameWallet from '../common/UsernameWallet';
import './Cart.css';

export default function Cart() {
    const { state, dispatch } = useContext(AppContext);
    const { user, cart } = state;
    const { coupon: cartCoupon } = cart;
    const cartId = get(cart, 'id', []);
    const products = get(cart, 'products', []);
    const packages = get(cart, 'packages', []);
    const subtotal = get(cart, 'totalCartPrice', 0);
    const [selectedField] = useState(products.length > 0 ? 'products' : 'packages');
    const [newCart, setNewCart] = useState(cart);
    const [coupons, setCoupons] = useState([]);
    const [coupon, setCoupon] = useState(!cartCoupon ? '' : cartCoupon);
    const [successCoupon, setSuccessCoupon] = useState('');
    const [showCouponInput, setShowCouponInput] = useState(!cartCoupon ? 'false' : 'true');
    const [couponError, setCouponError] = useState('');
    const [total, setTotal] = useState(() => {
        if (cartCoupon) {
            return Number(cart.totalPriceAfterCoupon);
        }
        return subtotal;
    });
    const [newItemsForUpdate, setNewItemsForUpdate] = useState({});

    useEffect(() => {
        setTotal((prevState) => {
            if (cartCoupon) {
                return Number(cart.totalPriceAfterCoupon);
            }
            return subtotal;
        });
        setCoupon('');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartCoupon, cart]);

    useEffect(() => {}, [newItemsForUpdate]);

    const calculateForUpdatedItem = (item, field) => {
        if (newItemsForUpdate[item.id] === undefined) return item[field];
        if (newItemsForUpdate[item.id][field] === 0) return 0;
        return newItemsForUpdate[item.id][field];
    };

    const increaseQuantity = (itemId) => {
        const itemIndex = cart[selectedField].findIndex((item) => item.id === itemId);
        if (itemIndex < 0) return;

        const selectedItem = cart[selectedField][itemIndex];

        const updatedItem = {
            totalProductQuantity: calculateForUpdatedItem(selectedItem, 'totalProductQuantity') + 1,
            totalProductPrice:
                calculateForUpdatedItem(selectedItem, 'totalProductPrice') + selectedItem.price,
        };

        setNewItemsForUpdate((prevState) => ({
            ...prevState,
            [itemId]: updatedItem,
        }));
    };

    const decreaseQuantity = (itemId) => {
        const itemIndex = cart[selectedField].findIndex((item) => item.id === itemId);
        if (itemIndex < 0) return;
        if (newItemsForUpdate[itemId] && newItemsForUpdate[itemId].totalProductQuantity === 1)
            return;

        const selectedItem = cart[selectedField][itemIndex];

        const updatedItem = {
            totalProductQuantity:
                ((newItemsForUpdate[itemId] && newItemsForUpdate[itemId].totalProductQuantity) ||
                    selectedItem.totalProductQuantity) - 1,
            totalProductPrice:
                ((newItemsForUpdate[itemId] && newItemsForUpdate[itemId].totalProductPrice) ||
                    selectedItem.totalProductPrice) - selectedItem.price,
        };

        setNewItemsForUpdate((prevState) => ({
            ...prevState,
            [itemId]: updatedItem,
        }));
    };

    const onRemoveCartCoupon = () => {
        const token = Cookie.get('token');
        const updatedCart = {
            ...cart,
            coupon: '',
            totalPriceAfterCoupon: cart.totalCartPrice,
        };

        const onSuccessCartUpdate = (responseCartUpdate) => {
            dispatch({ type: 'UPDATE_CART', updatedCart });
        };

        const onErrorCartUpdate = () => {};

        ApiHelper.carts
            .updateCart(cartId, { cartDetails: JSON.stringify(updatedCart) }, token)
            .then(onSuccessCartUpdate)
            .catch(onErrorCartUpdate);
    };

    const onRemoveItem = (itemId) => {
        const token = Cookie.get('token');
        const itemIndex = cart[selectedField].findIndex((item) => item.id === itemId);
        if (itemIndex < 0) return;
        const selectedItem = cart[selectedField][itemIndex];
        const updatedCart = {
            ...cart,
            coupon: cart[selectedField].length === 1 ? '' : cart.coupon,
            totalCartItems: cart.totalCartItems - selectedItem.totalProductQuantity,
            totalCartPrice: Number(
                (cart.totalCartPrice - selectedItem.totalProductPrice).toFixed(2)
            ),
            totalPriceAfterCoupon: Number(
                (cart.totalPriceAfterCoupon - selectedItem.totalProductPrice).toFixed(2)
            ),
            selectedField: cart[selectedField].splice(itemIndex, 1),
        };

        const onSuccessCartUpdate = (responseCartUpdate) => {
            dispatch({ type: 'UPDATE_CART', updatedCart });
        };

        const onErrorCartUpdate = () => {};

        ApiHelper.carts
            .updateCart(cartId, { cartDetails: JSON.stringify(updatedCart) }, token)
            .then(onSuccessCartUpdate)
            .catch(onErrorCartUpdate);
    };

    const checkItemStatus = (cartItem) => {
        if (newItemsForUpdate[cartItem.id] === undefined) return 'not_updated';
        if (newItemsForUpdate[cartItem.id].totalProductQuantity === 0) return 'updated';
        return 'updated';
    };

    const onUpdateCart = () => {
        const updatedItems = cart[selectedField].map((item) => {
            if (checkItemStatus(item) === 'updated') {
                return {
                    ...item,
                    totalProductPrice: newItemsForUpdate[item.id].totalProductPrice,
                    totalProductQuantity: newItemsForUpdate[item.id].totalProductQuantity,
                };
            }
            return item;
        });
        const updatedCart = {
            ...cart,
            [selectedField]: updatedItems,
            totalCartItems: 0,
            totalCartPrice: 0,
            totalPriceAfterCoupon: 0,
        };
        updatedCart[selectedField] = updatedCart[selectedField].filter(
            (item) => item.totalProductQuantity !== 0
        );
        updatedCart[selectedField].forEach((item) => {
            updatedCart.totalCartItems += item.totalProductQuantity;
            updatedCart.totalCartPrice =
                Number(updatedCart.totalCartPrice + item.totalProductPrice).toFixed(2) * 1;
        });

        const onSuccessCoupon = (responseCoupon) => {
            const data = get(responseCoupon, 'data', []);
            const existingCoupon = head(data);
            const token = Cookie.get('token');

            if (existingCoupon !== undefined) {
                if (updatedCart.totalCartPrice < existingCoupon.Value) {
                    setCouponError(
                        "Can't update the cart. Coupon value must be getter then cart price"
                    );
                    return;
                }
                updatedCart.totalPriceAfterCoupon =
                    updatedCart.totalCartPrice - existingCoupon.Value;
            } else {
                updatedCart.totalPriceAfterCoupon = updatedCart.totalCartPrice;
            }

            const onSuccessCartUpdate = (responseCartUpdate) => {
                setCoupon('');
                dispatch({ type: 'UPDATE_CART', updatedCart });
            };

            const onErrorCartUpdate = () => {};

            ApiHelper.carts
                .updateCart(cartId, { cartDetails: JSON.stringify(updatedCart) }, token)
                .then(onSuccessCartUpdate)
                .catch(onErrorCartUpdate);
        };

        const onErrorCoupon = () => {};

        const params = { Name: cartCoupon.toUpperCase() };
        ApiHelper.coupons.getCoupon(params).then(onSuccessCoupon).catch(onErrorCoupon);
    };

    const onApplyCoupon = () => {
        if (coupon === '' || cartCoupon === coupon.toUpperCase()) {
            setShowCouponInput(true);
            setCouponError('');
            return;
        }
        const params = { Name: coupon.toUpperCase() };

        const onSuccessCoupon = (responseCoupon) => {
            const data = get(responseCoupon, 'data', []);
            const existingCoupon = head(data);

            if (existingCoupon !== undefined) {
                setSuccessCoupon(existingCoupon);
                const couponPrice = existingCoupon.Value;
                if (subtotal < couponPrice) {
                    setCouponError('Please add items to use coupon.');
                } else {
                    const token = Cookie.get('token');
                    setTotal(subtotal - couponPrice);
                    const updatedCart = {
                        ...cart,
                        coupon: existingCoupon.Name,
                        totalPriceAfterCoupon: (subtotal - couponPrice).toFixed(2),
                    };

                    setShowCouponInput(false);

                    const onSuccessCartUpdate = (responseCartUpdate) => {
                        setCoupon('');
                        dispatch({ type: 'UPDATE_CART', updatedCart });
                    };

                    const onErrorCartUpdate = () => {};

                    ApiHelper.carts
                        .updateCart(cartId, { cartDetails: JSON.stringify(updatedCart) }, token)
                        .then(onSuccessCartUpdate)
                        .catch(onErrorCartUpdate);
                }
            } else {
                setCouponError('Invalid coupon!');
            }
        };

        const onErrorCoupon = () => {};

        ApiHelper.coupons.getCoupon(params).then(onSuccessCoupon).catch(onErrorCoupon);
    };

    const calculateItemQuantity = (item) => {
        if (newItemsForUpdate[item.id] === undefined) return item.totalProductQuantity;
        if (newItemsForUpdate[item.id].totalProductQuantity === 0) return 0;
        return newItemsForUpdate[item.id].totalProductQuantity;
    };

    const CartItems = () => {
        const selectedFiled = products.length !== 0 ? 'products' : 'packages';
        if (!Array.isArray(cart[selectedFiled]) || cart[selectedFiled].length > 0) {
            const renderItems = cart[selectedFiled].map((item) => (
                <div className="cart-TableBlock" key={item.id}>
                    <div className="cart-Table-close">
                        <span to="/" className="close-icon a" onClick={() => onRemoveItem(item.id)}>
                            {' '}
                        </span>
                    </div>
                    <div className="cart-TableBlock-img">
                        <img src={`${ENV.apiURL}${item.image}`} alt={item.name} />
                    </div>
                    <div className="cart-Table-title">
                        <a href="/">{item.name}</a>
                    </div>
                    <div className="cart-Table-price">${item.price}</div>
                    <input
                        type="button"
                        value="+"
                        id="plus"
                        className="plus"
                        onClick={() => increaseQuantity(item.id)}
                    />
                    <div className="cart-Table-x">x{calculateItemQuantity(item)}</div>
                    <input
                        type="button"
                        value="–"
                        id="minus"
                        className="minus"
                        onClick={() => decreaseQuantity(item.id)}
                    />
                    <div className="cart-Table-price-full">
                        {selectedField === 'packages'
                            ? `$${Number(item.totalProductPrice).toFixed(2)}`
                            : `${item.totalProductPrice}`}
                    </div>
                </div>
            ));
            return renderItems;
        }
        return <></>;
    };

    return (
        <div className="page-content">
            <div className="page-top">Cart</div>
            <div className="text-text">
                <div className="cart-user">
                    <UsernameWallet username={user.username} coin={user.coin} />
                </div>
                <ul className="top-block-cart">
                    <li className="top-title-cart">
                        <span className="top-number-cart">Item Name</span>
                        <span className="top-name-cart">PRICE</span>{' '}
                        <span className="top-lvl-cart">QUANTITY</span>{' '}
                        <span className="top-Res-cart">TOTAL</span>
                    </li>
                </ul>
                <div className="cart-Block">
                    {CartItems()}

                    {showCouponInput ? (
                        <input
                            className="coupon-input"
                            type="text"
                            name="coupon"
                            placeholder="Coupon"
                            onChange={(event) => {
                                if (couponError) {
                                    setCouponError('');
                                }
                                setCoupon(event.target.value);
                            }}
                            value={coupon}
                        />
                    ) : (
                        <></>
                    )}
                    {couponError ? (
                        <p style={{ marginTop: '34px', marginBottom: '-20px', color: '#00fcff' }}>
                            {couponError}
                        </p>
                    ) : (
                        <></>
                    )}

                    <div className="cart-button flex-s-c">
                        <div className="cart-link-right">
                            <span className="button_cart a" onClick={onApplyCoupon}>
                                APPLY COUPON
                            </span>
                        </div>
                        <div className="cart-link-right">
                            <span className="button_cart a" onClick={onUpdateCart}>
                                update cart
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cart-Block-bottom">
                    <div className="cart-Block-bottom-title">CART TOTALS</div>
                    <div className="cart-Block-bottom-bt flex-s-c">
                        <div className="cart-subtotal">Subtotal</div>
                        <div className="cart-total">
                            {selectedField === 'packages'
                                ? `$${Number(subtotal).toFixed(2)}`
                                : `${subtotal}`}
                        </div>
                    </div>
                    {cartCoupon ? (
                        <div className="cart-Block-bottom-bt flex-s-c">
                            <div className="cart-subtotal">
                                <span
                                    className="close-icon close-coupon"
                                    onClick={onRemoveCartCoupon}
                                />
                                Applied Coupon: {cartCoupon}
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    <div className="cart-Block-bottom-bt flex-s-c">
                        <div className="cart-subtotal">Total</div>
                        <div className="cart-total">
                            {selectedField === 'packages'
                                ? `$${Number(total).toFixed(2)}`
                                : `${total}`}
                        </div>
                    </div>
                    <div className="cart-link-right-total">
                        {' '}
                        <Link to="/checkout" className="button_cart a">
                            Check Out
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
