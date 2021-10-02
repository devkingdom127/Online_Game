import Axios from '../utilities/Axios';

const authorization = (token) => ({ Authorization: `Bearer ${token}` });

const ApiHelper = {
    user: {
        register: (credentials) => Axios.post('/auth/local/register', credentials),
        login: (credentials) => Axios.post('/auth/local', credentials),
        getMe: (token) =>
            Axios.get('/users/me', {
                headers: {
                    ...authorization(token),
                },
            }),
        logout: () => {},
        update: (data, id, token) =>
            Axios.put(`/users/${id}`, data, {
                headers: {
                    ...authorization(token),
                },
            }),
    },
    events: {
        getEvents: (params = {}) => Axios.get('/events', { params }),
    },
    news: {
        getNews: (params = {}) => Axios.get('/newsitems', { params }),
    },
    packages: {
        getPackages: (params = {}) => Axios.get('/packages', { params }),
    },
    categories: {
        getCategories: (params = {}) => Axios.get('/categories', { params }),
        getCount: (category) => Axios.get(`/categories/count/categories.Name=${category}`),
    },
    categoryNames: {
        getCategoryNames: (params = {}) => Axios.get('/category-names', { params }),
    },
    products: {
        getProducts: (params = {}) => Axios.get('/products', { params }),
    },
    carts: {
        getCart: (id, token) =>
            Axios.get(`/carts/${id}`, {
                headers: {
                    ...authorization(token),
                },
            }),
        updateCart: (id, data, token) =>
            Axios.put(`/carts/${id}`, data, {
                headers: {
                    ...authorization(token),
                },
            }),
    },
    orders: {
        getOrder: (params, token) =>
            Axios.get(`/orders`, {
                headers: {
                    ...authorization(token),
                },
                params,
            }),
        createOrder: (data, token) =>
            Axios.post(`/orders`, data, {
                headers: {
                    ...authorization(token),
                },
            }),
    },
    games: {
        getTopTenPlayers: () => Axios.get('/games/top-ten-players'),
        getTopTenPets: () => Axios.get('/games/top-ten-pets'),
        getTopTenGuilds: () => Axios.get('/games/top-ten-guilds'),
        getTotalOnlinePlayers: () => Axios.get('/games/total-online-players'),
    },
    youtubeVideos: {
        getYoutubeVideos: () => Axios.get('/youtube-videos'),
    },
    socialMedias: {
        getSocialMedias: () => Axios.get('/social-medias'),
    },
    setups: {
        getSetups: () => Axios.get('/setups'),
    },
    gameUIs: {
        getGameUIs: () => Axios.get('/game-uis'),
    },
    classes: {
        getClasses: () => Axios.get('/classes'),
    },
    ghostFighters: {
        getGhostFighters: () => Axios.get('/ghost-fighters'),
    },
    swordsmen: {
        getSwordsmen: () => Axios.get('/swordsmen'),
    },
    mages: {
        getMages: () => Axios.get('/mages'),
    },
    warriors: {
        getWarriors: () => Axios.get('/warriors'),
    },
    coupons: {
        getCoupons: () => Axios.get('/coupons'),
        getCoupon: (params = {}) => Axios.get('/coupons', { params }),
    },
    downloadGuide: {
        getDownloadGuide: () => Axios.get('/download-guide'),
    },
    downloadLinks: {
        getDownloadLinks: () => Axios.get('/download-links'),
    },
    featuredPosts: {
        getFeaturedPosts: () => Axios.get('/featured-post'),
    },
    bannerPosts: {
        getBannerPosts: () => Axios.get('/banner-posts'),
    },
    characterNames: {
        getCharacterNames: () => Axios.get('/character-names'),
    },
    isExist: (data) => Axios.post('/users-permissions/users/check-availability', data),
};

export default ApiHelper;
