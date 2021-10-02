import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

export default function AuthSync({ children }) {
    const { dispatch } = useContext(AppContext);

    const syncLogout = (event) => {
        if (event.key === 'logout') {
            dispatch({ type: 'LOGOUT' });
        }
    };

    useEffect(() => {
        window.addEventListener('storage', syncLogout);

        return () => {
            window.removeEventListener('storage', syncLogout);
            window.localStorage.removeItem('logout');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return children;
}
