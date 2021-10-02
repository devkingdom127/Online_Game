import React from 'react';
import './WikiMenu.css';


export default function WikiMenuTab3() {
    return (
        <div className="page-content">
            <div className="page-top">WIKI</div>
            <div className="text-text">
                <div className="page-text page-text-center">
                    <p>Click an image to brovce to the class of your choice!</p>
                </div>
                <div className="wiki-menu-tab">
                    <div className="weapons-img-tab flex-s-c">
                        <a href="/">
                            <img src={Sword} alt="" />{' '}
                        </a>
                        <a href="/">
                            <img src={Sword2} alt="" />{' '}
                        </a>
                        <a href="/">
                            <img src={Sword} alt="" />{' '}
                        </a>
                        <a href="/">
                            <img src={Sword2} alt="" />{' '}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
