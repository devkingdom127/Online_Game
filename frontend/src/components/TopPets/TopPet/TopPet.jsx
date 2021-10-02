import React from 'react';
import './TopPet.css';

export default function TopPet(props) {
    const { ownerName, petName, level } = props;
    return (
        <li className="top-list">
            <span className="top-number">{ownerName}</span>
            <span className="top-name">
                <a href="/" title="nickname">
                    {petName}
                </a>
            </span>
            <span className="score">{level}</span>
        </li>
    );
}
