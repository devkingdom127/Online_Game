/* eslint-disable no-case-declarations */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import Cookie from 'js-cookie';
import get from 'lodash/get';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import ApiHelper from '../../data/ApiHelper';
import ENV from '../../utilities/environment';
import UsernameWallet from '../common/UsernameWallet';
import './Order.css';

export default function Order(props) {
    const { match } = props;
    const { path } = match;
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    const [orders, setOrders] = useState([]);

    const onLogout = () => {
        Cookie.remove('token');
        dispatch({ type: 'LOGOUT' });
        window.localStorage.setItem('logout', Date.now());
    };

    const PackageOrderItems = ({ packages }) =>
        packages.map((item) => (
            <tr>
                <td>
                    <div className="content-shop-item-img">
                        <img src={`${ENV.apiURL}${item.image}`} alt="" />
                    </div>
                </td>
                <td>{item.name}</td>
                <td>{item.totalProductQuantity}</td>{' '}
                <td className="td-td-order">${item.totalProductPrice}</td>
            </tr>
        ));

    const ProductOrderItems = ({ products }) =>
        products.map((item) => (
            <tr>
                <td>
                    <div className="content-shop-item-img">
                        <img src={`${ENV.apiURL}${item.image}`} alt={item.name} />
                    </div>
                </td>
                <td>{item.name}</td>
                <td>{item.totalProductQuantity}</td>{' '}
                <td className="td-td-order">{item.totalProductPrice}</td>
            </tr>
        ));

    const CoinSendOrderItems = ({ coinSend }) =>
        coinSend.map((item) => (
            <tr>
                <td>
                    <div className="content-shop-item-img">
                        <img src={`${ENV.apiURL}${item.image}`} alt={item.name} />
                    </div>
                </td>
                <td>{item.name}</td>
                <td>{item.totalProductQuantity}</td>{' '}
                <td className="td-td-order">{item.totalProductPrice}</td>
            </tr>
        ));

    const OrderItems = () => {
        const orderItems = orders.map((order) => {
            const orderDetails = get(order, 'OrderDetails', {});
            const hasPackages = orderDetails.packages.length > 0;
            const hasProducts = orderDetails.products.length > 0;
            const hasCoinSend = orderDetails.coinSend?.length > 0;
            const orderCategory =
                hasPackages > 0 ? 'packages' : hasProducts ? 'products' : 'coinSend';

            let renderItems = <></>;

            switch (orderCategory) {
                case 'packages':
                    const { packages } = orderDetails;
                    renderItems = PackageOrderItems({ packages });
                    break;
                case 'products':
                    const { products } = orderDetails;
                    renderItems = ProductOrderItems({ products });
                    break;
                case 'coinSend':
                    const { coinSend } = orderDetails;
                    renderItems = CoinSendOrderItems({ coinSend });
                    break;
                default:
                    break;
            }

            return renderItems;
        });

        return orderItems;
        // const recentOrder = orders[0] || [];
        // const orderDetails = get(recentOrder, 'OrderDetails', {});
        // const selectedField = orderDetails.packages !== 0 ? 'packages' : 'products';
        // const orderedItems = get(orderDetails, selectedField, []);

        // if (orderedItems.length === 0) return <></>;
        // const items = orderedItems.map((item) => (
        //     <tr>
        //         <td>
        //             <div className="content-shop-item-img">
        //                 <img src={`${ENV.apiURL}${item.image}`} alt="" />
        //             </div>
        //         </td>
        //         <td>{item.name}</td> <td>{item.totalProductQuantity}</td>{' '}
        //         <td className="td-td-order">{item.totalProductPrice}</td>
        //     </tr>
        // ));
        // return items;
    };

    // const OrderItems = () => {

    // }

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const token = Cookie.get('token');
        const params = {
            user_id: user.id,
            _sort: 'published_at:DESC',
            _limit: 5,
        };

        const onSuccess = (response) => {
            const data = get(response, 'data', []);
            setOrders(data);
        };

        const onError = (err) => {};

        ApiHelper.orders.getOrder(params, token).then(onSuccess).catch(onError);
    }, [user.id]);

    return (
        <div className="page-content">
            <div className="page-top"> MY ORDERS</div>
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
                <div className="page-text page-text-center">
                    <p>Your recent purchases</p>
                </div>
                <table className="table-items">
                    <tr>
                        <th colSpan="1">SKILL IMAGE</th> <th colSpan="1">NAME</th>{' '}
                        <th colSpan="1">QUANTITY</th> <th colSpan="1">COINS</th>
                    </tr>
                    {OrderItems()}
                </table>
            </div>
        </div>
    );
}
