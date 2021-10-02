// eslint-disable-next-line consistent-return
const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'AUTH_START':
            return { user: null, isLoading: true, cart: [] };
        case 'AUTH_SUCCESS': {
            return { user: action.user, isLoading: false, cart: action.cart };
        }
        case 'AUTH_FAIL':
            return { user: null, isLoading: false, cart: [] };
        case 'LOGOUT':
            return { user: null, isLoading: false, cart: [] };
        case 'UPDATE_CART':
            return { ...state, cart: action.updatedCart };
        case 'UPDATE_USER':
            return { ...state, user: action.user };
        default:
            return state;
    }
};

export default AuthReducer;
