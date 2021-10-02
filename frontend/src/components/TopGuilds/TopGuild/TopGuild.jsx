import React from 'react';
import './TopGuild.css';

export default function TopGuild() {
    // const {} = props;
    return (
        <li className="top-list">
            <span className="top-number">1.</span>
            <span className="top-flag" />
            <span className="top-name">
                <a href="/" title="nickname">
                    KINGman
                </a>
            </span>
            <span className="top-lvl">150</span>
            <span className="top-Res">400</span>
        </li>
    );
}
