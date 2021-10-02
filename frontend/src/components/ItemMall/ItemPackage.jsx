import Cookie from 'js-cookie';
import get from 'lodash/get';
import React, { useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import colors from '../../constants/colors';
import { AppContext } from '../../context/AppContext';
import ApiHelper from '../../data/ApiHelper';
import Cart from '../../data/Cart';
import ENV from '../../utilities/environment';
import Snackbar from '../common/Snackbar';
import './ItemMall.css';

export default function ItemPackage(props) {
    const { item, price } = props;
    const { state, dispatch } = useContext(AppContext);
    const [quantity, setQuantity] = useState(0);
    const { user, cart } = state;
    const cartId = get(cart, 'id', '');
    const coupon = get(cart, 'coupon', '');
    const cartProducts = get(cart, 'products', []);
    const cartPackages = get(cart, 'packages', []);
    const [alertMessage, setAlertMessage] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    const increaseQuantity = () => {
        setQuantity((prevState) => prevState + 1);
    };

    const decreaseQuantity = () => {
        if (quantity !== 0) {
            setQuantity((prevState) => prevState - 1);
        }
    };

    const addToCart = () => {
        if (user === null) {
            setAlertMessage({ body: 'Please login to access your cart', color: colors.error });
            setShowAlert(true);
            return;
        }
        if (quantity === 0) {
            setAlertMessage({
                body: 'Please select the quantity to add item to cart',
                color: colors.error,
            });
            setShowAlert(true);
            return;
        }
        if (cartProducts.length > 0) {
            setAlertMessage({
                body: 'Please clear or order the products in the cart before adding packages',
                color: colors.error,
            });
            setShowAlert(true);
            return;
        }

        const token = Cookie.get('token');
        // eslint-disable-next-line prefer-const
        let { totalCartPrice = 0, totalCartItems = 0, packages = [] } = cart;
        totalCartPrice = totalCartPrice <= 0 ? 0 : totalCartPrice;
        totalCartItems = totalCartItems <= 0 ? 0 : totalCartItems;

        const updatedPackages = [...packages];
        let newQuantity = quantity;
        const packageIndex = packages.findIndex((el) => el.id === item.id);

        // package is already exist in the cart
        if (packageIndex >= 0) {
            newQuantity = cartPackages[packageIndex].totalProductQuantity + quantity;
            updatedPackages[packageIndex].totalProductQuantity = newQuantity;
            updatedPackages[packageIndex].totalProductPrice += Number(
                (price * quantity).toFixed(2)
            );
            updatedPackages[packageIndex].price = price;
        } else {
            // package doesn't exist in the cart
            let name;
            let coin;

            if (['', null, undefined].includes(item.name)) {
                name = `${item.coin}`;
                coin = item.coin;

                if (item.bonus_coin > 0) {
                    name += ` + ${item.bonus_coin}`;
                    coin += item.bonus_coin;
                }
            } else {
                name = item.name;
                coin = item.coin;

                if (item.bonus_coin > 0) {
                    name += ` + ${item.bonus_coin}`;
                    coin += item.bonus_coin;
                }
            }

            updatedPackages.push({
                id: item.id,
                name,
                image: item.image.url,
                coin,
                price,
                totalProductPrice: Number((price * newQuantity).toFixed(2)),
                totalProductQuantity: newQuantity,
            });
        }

        totalCartPrice =
            Number(totalCartPrice + Number((price * quantity).toFixed(2))).toFixed(2) * 1;
        totalCartItems += quantity;
        const products = [];

        const updatedCart = new Cart(
            cartId,
            products,
            updatedPackages,
            totalCartItems,
            totalCartPrice,
            0,
            coupon
        );

        const onSuccess = () => {
            setQuantity(0);
            setAlertMessage({ body: 'Package added to cart successfully.', color: colors.success });
            setShowAlert(true);
            dispatch({ type: 'UPDATE_CART', updatedCart });
        };

        const onError = () => {};

        ApiHelper.carts
            .updateCart(cartId, { cartDetails: JSON.stringify(updatedCart) }, token)
            .then(onSuccess)
            .catch(onError);
    };

    return (
        <Popup
            position="center center"
            modal
            trigger={
                <div className="shop-top-item shop-top-item-right">
                    <div className="pack">
                        <img src={`${ENV.apiURL}${item.image.url}`} alt="" />
                    </div>
                    <div className="price-coin">
                        <i className="price-icon" />
                        {item.coin} {item.bonus_coin ? ` + ${item.bonus_coin}` : ''}
                    </div>
                    <div className="button-shop-bottom flex-s-c">
                        <div className="button-shop-left">
                            <span className="button-shop">Buy</span>
                        </div>
                        <div className={`${user ? 'button-shop-right' : ''}`}>
                            {user ? (
                                <p>${item.price}</p>
                            ) : (
                                <>
                                    <p className="login-for-price">Login</p>
                                    <span className="login-for-price">for price</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            }
        >
            <div className="modal-content-weapons flex-s-c">
                <div className="popup-img">
                    <img src={`${ENV.apiURL}${item.image.url}`} alt="" />
                </div>
                <div className="content-weapons">
                    {/* <div className="weapons-text-text">
                                            100%-500% MORE POVER SECURIS SWORD
                                            <p>
                                                An object made by man, as opposed to natural, an
                                                object specially designed to function in the arts.
                                            </p>
                                        </div> */}
                    <div className="popup-coins flex-s-c">
                        <div className="popup-price-coin">
                            <i className="price-icon" />
                            {item.coin}
                            {item.bonus_coin ? ` + ${item.bonus_coin}` : ''}
                        </div>
                        <div className="popup-counter">
                            <input
                                type="button"
                                value="+"
                                id="plus"
                                className="plus"
                                onClick={increaseQuantity}
                            />
                            <span id="count" className="count">
                                {quantity}
                            </span>
                            <input
                                type="button"
                                value="–"
                                id="minus"
                                className="minus"
                                onClick={decreaseQuantity}
                            />
                        </div>
                    </div>
                    <div className="button_weapons-center">
                        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                        <span href="/" className="button_weapons a" onClick={addToCart}>
                            ADD TO CART
                        </span>
                    </div>
                </div>
                <Snackbar message={alertMessage} show={showAlert} setShow={setShowAlert} />
            </div>
        </Popup>
    );
}
