import React from 'react';

export default function List(props) {
    const { title, header1, header2, header3, header4, data } = props;
    return (
        <div className="server stat-block block-4">
            <h3>{title}</h3>
            <ul className="top-block">
                <li className="top-title">
                    <span className="top-number">#</span>
                    <span className="top-flag" />
                    <span className="top-name">Name</span>
                    <span className="top-lvl">LvL</span>
                    <span className="top-Res">Res</span>
                </li>
                <li className="top-list">
                    <span className="top-number">1.</span>
                    <span className="top-flag">
                        <img src={FlagIcon} alt="" />
                    </span>
                    <span className="top-name">
                        <a href="/" title="nickname">
                            KINGman
                        </a>
                    </span>
                    <span className="top-lvl">150</span>
                    <span className="top-Res">400</span>
                </li>
            </ul>
            <div className="more-top">
                <a href="/" className="button_top_block">
                    All Players
                </a>
            </div>
        </div>
    );
}
