import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, useHistory } from 'react-router-dom';
import App from './App';
import ScrollToSection from './components/common/ScrollToSection';
import AppContextProvider from './context/AppContext';
import AuthSync from './data/AuthSync';
import './index.css';

const RootComponent = () => {
    const history = useHistory();

    return (
        <React.StrictMode>
            <BrowserRouter>
                <ScrollToSection />
                <AppContextProvider>
                    <AuthSync history={history}>
                        <App />
                    </AuthSync>
                </AppContextProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
};

ReactDOM.render(<RootComponent />, document.getElementById('root'));
