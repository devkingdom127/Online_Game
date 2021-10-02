/* eslint-disable no-unused-vars */
import React from 'react';
import './TopPlayer.css';

export default function TopPlayer(props) {
    const { name, level, playerClass, number } = props;
    return (
        <li className="top-list">
            {/* <span className="top-number">{number}</span> */}
            {/* <span className="top-flag">
                <img src={FlagIcon} alt="" />
            </span> */}
            <span className="top-name">
                <a href="/" title="nickname">
                    {name}
                </a>
            </span>
            <span className="top-class">{playerClass}</span>
            <span className="top-level">{level}</span>
        </li>
    );
}
