import get from 'lodash/get';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ApiHelper from '../../data/ApiHelper';
import TopPet from './TopPet/TopPet';
import './TopPets.css';

export default function TopPets() {
    const [topPets, setTopPets] = useState([]);

    useEffect(() => {
        const fetchTopPlayers = () => {
            const onSuccess = (response) => {
                const data = get(response, 'data.0', []);
                setTopPets(data);
            };

            const onError = () => {
                setTopPets([]);
            };

            ApiHelper.games.getTopTenPets().then(onSuccess).catch(onError);
        };

        fetchTopPlayers();
    }, []);

    const TopTenPets = topPets.map((item, index) => (
        <TopPet
            key={uuidv4()}
            number={index + 1}
            ownerName={item['Owner Name']}
            petName={item['Pet Name']}
            level={item['Pet Level']}
        />
    ));

    const TopSeven = TopTenPets.slice(0, 7);

    return (
        <div className="top stat-block block-4">
            <h3>TOP PETS</h3>
            <ul className="top-block pets">
                <li className="top-title" key={uuidv4()}>
                    <span className="top-number">Owner Name</span>
                    <span className="top-name">Pet Name</span>
                    <span className="score">LvL</span>
                </li>
                {TopSeven}
            </ul>
        </div>
    );
}
