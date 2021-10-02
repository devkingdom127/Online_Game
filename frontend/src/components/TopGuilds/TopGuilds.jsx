import get from 'lodash/get';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ApiHelper from '../../data/ApiHelper';
import TopGuild from './TopGuild/TopGuild';
import './TopGuilds.css';

export default function TopGuilds() {
    const [topGuilds, setTopGuilds] = useState([]);

    useEffect(() => {
        const fetchTopGuilds = () => {
            const onSuccess = (response) => {
                const data = get(response, 'data.0', []);
                const sliceData = data.slice(0, 10);
                setTopGuilds(sliceData);
            };

            const onError = () => {
                setTopGuilds([]);
            };

            ApiHelper.games.getTopTenGuilds().then(onSuccess).catch(onError);
        };

        fetchTopGuilds();
    }, []);

    const TopTenGuilds = topGuilds.map((item, index) => (
        <TopGuild
            key={uuidv4()}
            number={index + 1}
            name={item.GuildID}
            guild={item.Name}
            total={item['Pet Level']}
        />
    ));

    const TopSeven = TopTenGuilds.slice(0, 7);

    return (
        <div className="guilds-guilds stat-block block-4">
            <h3>TOP GUILDS</h3>
            <ul className="top-block">
                <li className="top-title" key={uuidv4()}>
                    <span className="top-number">#</span>
                    <span className="top-flag" />
                    <span className="top-name">Name</span>
                    <span className="top-lvl">Guild</span>
                    <span className="top-Res">Total</span>
                </li>
                {TopSeven}
            </ul>
        </div>
    );
}
