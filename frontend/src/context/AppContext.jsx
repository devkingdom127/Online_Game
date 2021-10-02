import Cookie from 'js-cookie';
import get from 'lodash/get';
import { createContext, useEffect, useReducer, useState } from 'react';
import ApiHelper from '../data/ApiHelper';
import Cart from '../data/Cart';
import AuthReducer from '../reducers/AuthReducer';

const initialState = {
    user: null,
    cart: [],
    isLoading: true,
};

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const [socialMediaLinks, setSocialMediaLinks] = useState([]);
    const [setups, setSetups] = useState([]);
    const [gameUIs, setGameUIs] = useState([]);
    const [ghostFighters, setGhostFighters] = useState([]);
    const [mages, setMages] = useState([]);
    const [swordsmen, setSwordsmen] = useState([]);
    const [warriors, setWarriors] = useState([]);
    const [youtubeVideos, setYoutubeVideos] = useState(null);
    const [bannerPosts, setBannerPosts] = useState([]);
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [showPostRegMessage, setShowPostRegMessage] = useState(false);
    const [postRegMessage, setPostRegMessage] = useState('');

    useEffect(() => {
        const checkAuth = async () => {
            dispatch({ type: 'AUTH_START' });
            const token = Cookie.get('token');

            const onSuccessUser = (response) => {
                const user = get(response, 'data', null);
                const cartId = get(user, 'cart', '');

                const onSuccessCart = (responseCart) => {
                    const data = get(responseCart, 'data', {});
                    let cart = get(responseCart, 'data.cartDetails', new Cart(data.id));
                    if (
                        cart === null ||
                        cart === undefined
                        // (Array.isArray(cart) && cart.length === 0)
                    ) {
                        cart = new Cart(data.id);
                    }
                    if (typeof cart === 'string') {
                        cart = JSON.parse(cart);
                    }
                    dispatch({ type: 'AUTH_SUCCESS', user, cart });
                };

                const onErrorCart = () => {};

                ApiHelper.carts.getCart(cartId, token).then(onSuccessCart).catch(onErrorCart);
            };

            const onErrorUser = () => {
                dispatch({ type: 'AUTH_FAIL' });
                Cookie.remove('token');
            };

            if (token) {
                ApiHelper.user.getMe(token).then(onSuccessUser).catch(onErrorUser);
            } else {
                dispatch({ type: 'AUTH_FAIL' });
            }
        };

        checkAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const onSuccessMedias = (response) => {
            const data = get(response, 'data', []);
            setSocialMediaLinks(data);
        };

        const onErrorMedias = () => {};

        const onSuccessYoutubeVideos = (responseYoutubeVideos) => {
            const data = responseYoutubeVideos.data[0];
            setYoutubeVideos(data);
        };

        const onErrorYoutubeVideos = () => {};

        const onSuccessPosts = (response) => {
            const data = get(response, 'data', []);
            setBannerPosts(data);
        };

        const onErrorPosts = () => {};

        ApiHelper.socialMedias.getSocialMedias().then(onSuccessMedias).catch(onErrorMedias);
        ApiHelper.youtubeVideos
            .getYoutubeVideos()
            .then(onSuccessYoutubeVideos)
            .catch(onErrorYoutubeVideos);
        ApiHelper.bannerPosts.getBannerPosts().then(onSuccessPosts).catch(onErrorPosts);
    }, []);

    useEffect(() => {
        // console.log('[AppContext]: cart:', state.cart);
    }, [state.cart]);

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch,
                total,
                setTotal,
                subtotal,
                setSubtotal,
                bannerPosts,
                youtubeVideos,
                socialMediaLinks,
                showPostRegMessage,
                setShowPostRegMessage,
                postRegMessage,
                setPostRegMessage,
                wiki: {
                    setups,
                    gameUIs,
                    ghostFighters,
                    mages,
                    swordsmen,
                    warriors,
                    setSetups,
                    setGameUIs,
                    setGhostFighters,
                    setMages,
                    setSwordsmen,
                    setWarriors,
                },
            }}
        >
            {state.isLoading ? <></> : children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
