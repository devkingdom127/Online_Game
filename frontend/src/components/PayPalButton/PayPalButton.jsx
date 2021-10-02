/* eslint-disable no-unused-vars */
import Cookie from 'js-cookie';
import get from 'lodash/get';
import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { AppContext } from '../../context/AppContext';
import ApiHelper from '../../data/ApiHelper';
import Cart from '../../data/Cart';

// eslint-disable-next-line no-undef
const ReactPayPalButton = paypal.Buttons.driver('react', { React, ReactDOM });

export default function PayPalButton(props) {
    const { state, dispatch } = useContext(AppContext);
    const { placeOrder, setIsBusy } = props;
    const { cart, user } = state;
    const cartId = get(cart, 'id', '');
    const coupon = get(cart, 'coupon', '');

    const amountToPay = cart.totalPriceAfterCoupon
        ? cart.totalPriceAfterCoupon
        : cart.totalCartPrice;

    const createOrder = (data, actions) =>
        actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: amountToPay,
                    },
                },
            ],
        });

    const onCheckout = () => {
        setIsBusy(true);
        const token = Cookie.get('token');
        const reports = '';

        const data = {
            CharacterName: '',
            OrderDetails: cart,
            Coupon: coupon,
            user_id: user.id,
        };

        const onSuccessOrder = (responseOrder) => {
            let totalOrderedCoin = 0;

            cart.packages.forEach((item) => {
                totalOrderedCoin += item.coin * item.totalProductQuantity;
            });

            const totalUpdatedCoin = totalOrderedCoin + user.coin * 1;

            const updateData = {
                coin: totalUpdatedCoin,
            };

            const onSuccessUserUpdate = (response) => {
                const updatedUser = get(response, 'data', null);
                dispatch({ type: 'UPDATE_USER', user: updatedUser });
                const updatedCart = new Cart(cartId);

                const onSuccessCartUpdate = (responseCart) => {
                    const cartData = get(response, 'data', {});
                    const cartDetails = get(cartData, 'cartDetails', []);
                    dispatch({ type: 'UPDATE_CART', updatedCart });
                };

                const onErrorCartUpdate = () => {};

                ApiHelper.carts
                    .updateCart(cartId, { cartDetails: JSON.stringify(updatedCart) }, token)
                    .then(onSuccessCartUpdate)
                    .catch(onErrorCartUpdate);
            };

            const onErrorUserUpdate = () => {};

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

    const onApprove = async (data, actions) => {
        await actions.order.capture();
        onCheckout();
    };

    return (
        <ReactPayPalButton
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
        />
    );
}
