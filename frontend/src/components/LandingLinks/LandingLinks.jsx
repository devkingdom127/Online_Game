/* eslint-disable jsx-a11y/no-static-element-interactions */
import $ from 'jquery';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import ENV from '../../utilities/environment';
import './LandingLinks.css';

export default function LandingLinks() {
    const { state, socialMediaLinks } = useContext(AppContext);
    const { user } = state;

    useEffect(() => {
        $(document).ready(() => {
            const overlay = $('#overlay');
            const openModal = $('.open_modal');
            // close.current = $('.modal_close, #overlay');
            // const modal = $('.modal_div');

            // eslint-disable-next-line func-names
            openModal.click(function (event) {
                event.preventDefault();
                const div = $(this).attr('href');
                overlay.fadeIn(400, () => {
                    $(div).css('display', 'block').animate({ opacity: 1, top: '25%' }, 200);
                });
            });
        });
    }, []);

    return (
        <div className="fast-button">
            <div className="download-block">
                <Link to="/download" className="a">
                    <span>DOWNLOAD</span>
                    <br />
                    <p>Game client 1.45Gb</p>
                </Link>
            </div>
            {/* <!-- DOWNLOAD-block --> */}
            <div className="account-block" style={{ display: user ? '' : 'none' }}>
                <Link to="/myaccount" className="a">
                    <span>My Account</span>
                    <br />
                    <p>Main Page</p>
                </Link>
            </div>
            <div className="regisrtation-block" style={{ display: user ? 'none' : '' }}>
                <a href="#resister" className="open_modal a">
                    <span>REGISTRATION</span>
                    <br />
                    <p>Free client</p>
                </a>
            </div>

            {/* <!-- REGISTRATION-block --> */}
            {/* <!-- MY ACCOUNT-block --> */}
            <div className="net-block">
                {socialMediaLinks && socialMediaLinks.length > 0 ? (
                    socialMediaLinks.map((item) => (
                        <a
                            href={`${item.Link}`}
                            className="a"
                            key={item.id}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <div>
                                <img src={`${ENV.apiURL}${item.Icon.url}`} alt="" />
                            </div>
                            {item.Name}
                        </a>
                    ))
                ) : (
                    <></>
                )}
            </div>
            {/* <!--soc-block--> */}
        </div>
    );
}
