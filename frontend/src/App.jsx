import Snackbar from '@material-ui/core/Snackbar';
import $ from 'jquery';
import { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AccountPanel from './components/AccountPanel/AccountPanel';
import Cart from './components/Cart/Cart';
import CheckOut from './components/CheckOut/CheckOut';
import Download from './components/Download/Download';
import EditAccount from './components/EditAccount/EditAccount';
import Error404 from './components/Error404/Error404';
import Events from './components/Events/Events';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Index from './components/Index/Index';
import ItemMall from './components/ItemMall/ItemMall';
import LandingLinks from './components/LandingLinks/LandingLinks';
import Login from './components/Login/Login';
import Order from './components/Order/Order';
import Registration from './components/Registration/Registration';
import SendCoins from './components/SendCoins/SendCoins';
import WikiMenu from './components/Wiki/WikiMenu';
import { AppContext } from './context/AppContext';
import { circularProgressBar } from './jQuery/CircleStats';
import CommonRoute from './routes/CommonRoute';

function App({ history }) {
    const { showPostRegMessage, setShowPostRegMessage, postRegMessage } = useContext(AppContext);

    useEffect(() => {
        $(() => {
            $('.circlestat').circliful();
        });
        // eslint-disable-next-line no-unused-expressions
        circularProgressBar;
    }, []);

    /* 
        Google Analytics - set id in environment 
        - Set your Measurement ID if you use Google Analytics 4
        - Set your Tracking ID if you use Universal Google Analytics
    */
    useEffect(() => {
        ReactGA.initialize(`${process.env.REACT_APP_GOOGLE_ANALYTICS_MEASUREMENT_ID}`);
        ReactGA.pageview(window.location.pathname + window.location.search);
    }, []);

    return (
        <>
            <Header />
            <main className="content">
                <LandingLinks />
                <Switch>
                    <Route exact path="/" component={Index} history={history} />
                    <div className="blockStat flex-s-c">
                        <Switch>
                            <CommonRoute
                                exact
                                path="/order"
                                component={Order}
                                isProtected
                                history={history}
                            />
                            <CommonRoute
                                exact
                                path="/download"
                                component={Download}
                                isProtected={false}
                                history={history}
                            />
                            <CommonRoute
                                exact
                                path="/item-mall"
                                component={ItemMall}
                                isProtected={false}
                                history={history}
                            />
                            <CommonRoute
                                exact
                                path="/news/:id"
                                component={Events}
                                isProtected={false}
                                history={history}
                            />
                            <CommonRoute
                                exact
                                path="/events/:id"
                                component={Events}
                                isProtected={false}
                                history={history}
                            />
                            <CommonRoute
                                exact
                                path="/wiki"
                                component={WikiMenu}
                                isProtected={false}
                                history={history}
                            />
                            <CommonRoute
                                exact
                                path="/cart"
                                component={Cart}
                                isProtected
                                history={history}
                            />
                            <CommonRoute
                                exact
                                path="/myaccount"
                                component={AccountPanel}
                                isProtected
                                history={history}
                            />
                            <CommonRoute
                                exact
                                path="/myaccount/orders"
                                component={Order}
                                isProtected
                                history={history}
                            />
                            <CommonRoute
                                exact
                                path="/myaccount/edit"
                                component={EditAccount}
                                isProtected
                                history={history}
                            />
                            <CommonRoute
                                exact
                                path="/myaccount/send-coins"
                                component={SendCoins}
                                isProtected
                                history={history}
                            />
                            <CommonRoute
                                exact
                                path="/checkout"
                                component={CheckOut}
                                isProtected
                                history={history}
                            />
                            <CommonRoute path="*" component={Error404} />
                        </Switch>
                    </div>
                </Switch>
            </main>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={showPostRegMessage}
                onClose={() => setShowPostRegMessage(false)}
                message={postRegMessage}
                key="bottom center"
            />
            <Footer />
            {ReactDOM.createPortal(<Registration />, document.getElementById('resister'))}
            {ReactDOM.createPortal(<Login />, document.getElementById('login-login'))}
        </>
    );
}

export default App;
