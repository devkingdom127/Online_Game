// import React, { useContext } from 'react';
// import { AppContext } from '../../context/AppContext';

// export default function CartItem() {
//     const { state, dispatch } = useContext(AppContext);
//     const { cart } = state;
//     const products = get(cart, 'products', []);
//     const packages = get(cart, 'packages', []);
//     const subtotal = get(cart, 'totalCartPrice', 0);
//     const [selectedField] = useState(products.length > 0 ? 'products' : 'packages');

//     const selectedFiled = products.length !== 0 ? 'products' : 'packages';
//     if (cart[selectedFiled].length > 0) {
//         const renderItems = cart[selectedFiled].map((item) => (
//             <div className="cart-TableBlock" key={item.id}>
//                 <div className="cart-Table-close">
//                     <span to="/" className="close-icon a" onClick={() => onRemoveItem(item.id)}>
//                         {' '}
//                     </span>
//                 </div>
//                 <div className="cart-TableBlock-img">
//                     <img src={`${ENV.apiURL}${item.image}`} alt={item.name} />
//                 </div>
//                 <div className="cart-Table-title">
//                     <a href="/">{item.name}</a>
//                 </div>
//                 <div className="cart-Table-price">${item.price}</div>
//                 <div className="cart-Table-x">x{item.totalProductQuantity}</div>
//                 <div className="cart-Table-price-full">${item.totalProductPrice}</div>
//             </div>
//         ));
//         return renderItems;
//     }
//     return <></>;
// }
