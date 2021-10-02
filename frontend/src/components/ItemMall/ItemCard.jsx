/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import Cookie from 'js-cookie';
import get from 'lodash/get';
import React, { useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import colors from '../../constants/colors';
import { AppContext } from '../../context/AppContext';
import ApiHelper from '../../data/ApiHelper';
import Cart from '../../data/Cart';
import ENV from '../../utilities/environment';
import Snackbar from '../common/Snackbar';
import './ItemMall.css';

export default function ItemCard(props) {
    const [quantity, setQuantity] = useState(0);
    const { state, dispatch } = useContext(AppContext);
    const { cart, user } = state;
    const cartId = get(cart, 'id', '');
    const coupon = get(cart, 'coupon', '');
    const totalPrice = get(cart, 'totalPrice', 0);
    const cartProducts = get(cart, 'products', []);
    const cartPackages = get(cart, 'packages', []);
    const [alertMessage, setAlertMessage] = useState({});
    const [showAlert, setShowAlert] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const { id, name, description, price, image, videoTitle, video, videoMime } = props;

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
        if (cartPackages.length > 0) {
            setAlertMessage({
                body: 'Please clear or order the packages in the cart before adding products',
                color: colors.error,
            });
            setShowAlert(true);
            return;
        }

        const token = Cookie.get('token');
        // eslint-disable-next-line prefer-const
        let { totalCartPrice = 0, totalCartItems = 0, products = [] } = cart;
        totalCartPrice = totalCartPrice <= 0 ? 0 : totalCartPrice;
        totalCartItems = totalCartItems <= 0 ? 0 : totalCartItems;

        const updatedProducts = [...products];
        let newQuantity = quantity;
        const productIndex = products.findIndex((item) => item.id === id);

        // product is already exist in the cart
        if (productIndex >= 0) {
            newQuantity = cartProducts[productIndex].totalProductQuantity + quantity;
            updatedProducts[productIndex].totalProductQuantity = newQuantity;
            updatedProducts[productIndex].totalProductPrice += Number(
                (price * quantity).toFixed(2)
            );
            updatedProducts[productIndex].price = price;
        } else {
            // product doesn't exist in the cart
            updatedProducts.push({
                id,
                name,
                image,
                price,
                totalProductPrice: Number((price * newQuantity).toFixed(2)),
                totalProductQuantity: newQuantity,
            });
        }

        totalCartPrice += Number((price * quantity).toFixed(2));
        totalCartItems += quantity;
        const packages = [];

        const updatedCart = new Cart(
            cartId,
            updatedProducts,
            packages,
            totalCartItems,
            totalCartPrice,
            0,
            coupon
        );

        const onSuccess = (response) => {
            // item added to cart successful alert
            setQuantity(0);
            setAlertMessage({ body: 'Item added to cart successfully.', color: colors.success });
            setShowAlert(true);
            dispatch({ type: 'UPDATE_CART', updatedCart });
        };

        const onError = (error) => {
            setAlertMessage({ body: 'Something wrong', color: colors.error });
            setShowAlert(true);
        };

        ApiHelper.carts
            .updateCart(cartId, { cartDetails: JSON.stringify(updatedCart) }, token)
            .then(onSuccess)
            .catch(onError);
    };

    const Item = (
        <div className="weapons-bg">
            <div className="weapons-img">
                <Popup
                    modal
                    trigger={
                        <a href="#weapons_more" className="open_modal_re">
                            <img src={`${ENV.apiURL}${image}`} alt="" />
                        </a>
                    }
                >
                    <div className="modal-content-weapons flex-s-c">
                        <div className="weapons-img">
                            <a href="#weapons_more" className="open_modal_re">
                                <img src={`${ENV.apiURL}${image}`} alt="" />
                            </a>
                        </div>
                        <div className="content-weapons">
                            <div className="weapons-text-text">
                                {name}
                                <p>{description}</p>
                            </div>
                            <div className="weapons-coins flex-s-c">
                                <div className="price-coin">
                                    <i className="price-icon" />
                                    {price}
                                </div>
                                <div className="counter-pop">
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
                        </div>
                    </div>
                    <div className="button_weapons-center">
                        <span
                            href="/"
                            className="button_weapons"
                            onClick={addToCart}
                            role="button"
                            tabIndex={id}
                        >
                            ADD TO CART
                        </span>
                    </div>
                    <div
                        className="video-player"
                        style={{
                            background: `${
                                video && videoMime === 'image/gif'
                                    ? `url(${ENV.apiURL}${video}) 0 0 no-repeat`
                                    : `none`
                            }`,
                        }}
                    >
                        {videoMime !== 'image/gif' ? (
                            <video width="510" height="230" controls>
                                <source src={`${ENV.apiURL}${video}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <></>
                        )}
                        {/* <input type="button" className="start-video" value="&#9650;" /> */}
                        <p className="title-video">{videoTitle}</p>
                    </div>
                </Popup>
            </div>
            <div className="weapons-text">{name}</div>
            <div className="weapons-coins flex-s-c">
                <div className="price-coin">
                    <i className="price-icon" />
                    {price}
                </div>
                <div className="counter">
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
                <span
                    href="/"
                    className="button_weapons"
                    onClick={addToCart}
                    role="button"
                    tabIndex={id}
                >
                    ADD TO CART
                </span>
            </div>

            <Snackbar message={alertMessage} show={showAlert} setShow={setShowAlert} />
        </div>
    );

    return <>{Item}</>;
}
