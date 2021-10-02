import get from 'lodash/get';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ApiHelper from '../../data/ApiHelper';
import TopPlayer from './TopPlayer/TopPlayer';
import './TopPlayers.css';

export default function TopPlayers() {
    const [topPlayers, setTopPlayers] = useState([]);

    useEffect(() => {
        const fetchTopPlayers = () => {
            const onSuccess = (response) => {
                const data = get(response, 'data.0', []);
                setTopPlayers(data);
            };

            const onError = () => {
                setTopPlayers([]);
            };

            ApiHelper.games.getTopTenPlayers().then(onSuccess).catch(onError);
        };

        fetchTopPlayers();
    }, []);

    const TopTenPlayers = topPlayers.map((item, index) => (
        <TopPlayer
            key={uuidv4()}
            number={index + 1}
            name={item.Name}
            level={item.LEVEL}
            playerClass={item.Class}
        />
    ));

    const TopSeven = TopTenPlayers.slice(0, 7);

    return (
        <div className="server stat-block block-4">
            <h3>TOP PLAYERS</h3>
            <ul className="top-block pets">
                <li className="top-title" key={uuidv4()}>
                    <span className="top-number">Name</span>
                    <span className="top-name">Class</span>
                    <span className="score">LvL</span>
                </li>
                {TopSeven}
            </ul>
            {/* <ul className="top-block">
                <li className="top-title" key={uuidv4()}>
                    <span className="top-number">#</span>
                    <span className="top-flag" />
                    <span className="top-name">Name</span>
                    <span className="top-lvl">Class</span>
                    <span className="score">LvL</span>
                </li>
                {TopSeven}
            </ul> */}
        </div>
    );
}
