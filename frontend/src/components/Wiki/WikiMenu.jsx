/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import parse from 'html-react-parser';
import get from 'lodash/get';
import head from 'lodash/head';
import marked from 'marked';
import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sword from '../../assets/images/sword.png';
import { AppContext } from '../../context/AppContext';
import ApiHelper from '../../data/ApiHelper';
import markedConfig from '../../utilities/markedConfig';
import WikiArmor from './WikiArmor';
import WikiHats from './WikiHats';
import './WikiMenu.css';
import WikiSkills from './WikiSkills';
import WikiVigi from './WikiVigi';
import WikiWeapons from './WikiWeapons';

const availableClasses = [
    {
        alias: 'ghostFighters',
        name: 'ghost-fighters',
        target: 'getGhostFighters',
        set: 'setGhostFighters',
        inContext: 'ghostFighters',
    },
    {
        alias: 'mages',
        name: 'mages',
        target: 'getMages',
        set: 'setMages',
        inContext: 'mages',
    },
    {
        alias: 'swordsmen',
        name: 'swordsmen',
        target: 'getSwordsmen',
        set: 'setSwordsmen',
        inContext: 'swordsmen',
    },
    {
        alias: 'warriors',
        name: 'warriors',
        target: 'getWarriors',
        set: 'setWarriors',
        inContext: 'warriors',
    },
];

const itemCategories = [
    { name: 'Armor', image: Sword, target: 'ghost_fighter', match: 'wiki.armor' },
    { name: 'Hats', image: Sword, target: 'hat_components', match: 'wiki.hats' },
    { name: 'Skills', image: Sword, target: 'skill_components', match: 'wiki.skills' },
    { name: 'Vigi', image: Sword, target: 'vigi_components', match: 'wiki.vigi' },
    { name: 'Weapons', image: Sword, target: 'weapon_components', match: 'wiki.weapons' },
];

const targetFields = [
    { name: 'ghost-fighters', target: 'ghost_fighter' },
    { name: 'mages', target: 'mage_components' },
    { name: 'swordsmen', target: 'components' },
    { name: 'warriors', target: 'worrior' },
];

export default function WikiMenu() {
    const [selectedTab, setSelectedTab] = useState('Setup');
    // const [tabData, setTabData] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [classItems, setClassItems] = useState([]);
    // const [tableContent, setTableContent] = useState([]);
    const { wiki } = useContext(AppContext);
    const [toggle, setToggle] = useState(true);
    const [armorTableContent, setArmorTableContent] = useState([]);
    const [hatsTableContent, setHatsTableContent] = useState([]);
    const [skillsTableContent, setSkillsTableContent] = useState([]);
    const [vigiTableContent, setVigiTableContent] = useState([]);
    const [weaponsTableContent, setWeaponsTableContent] = useState([]);

    useEffect(() => {
        const onSuccess = (response, setState) => {
            const { data } = response;
            setState(data);
        };

        const onError = () => {};

        switch (selectedTab) {
            case 'Setup':
                if (wiki.setups.length === 0) {
                    ApiHelper.setups
                        .getSetups()
                        .then((response) => onSuccess(response, wiki.setSetups))
                        .catch(onError);
                }
                break;
            case 'Game UI':
                if (wiki.gameUIs.length === 0) {
                    ApiHelper.gameUIs
                        .getGameUIs()
                        .then((response) => onSuccess(response, wiki.setGameUIs))
                        .catch(onError);
                }
                break;
            default:
                break;
        }
    }, [selectedTab]);

    const setCurrentClassContent = ({ currentClass, items }) => {
        let armorData = [];
        let hatsData = [];
        let skillsData = [];
        let vigiData = [];
        let weaponsData = [];
        const matchedClass = targetFields.find((item) => item.name === currentClass.name);

        // eslint-disable-next-line consistent-return
        items.forEach((item) => {
            const data = head(item[matchedClass.target]);

            switch (data.__component) {
                case 'wiki.armor':
                    armorData.push(data);
                    break;
                case 'wiki.hats':
                    hatsData.push(data);
                    break;
                case 'wiki.skills':
                    skillsData.push(data);
                    break;
                case 'wiki.vigi':
                    vigiData.push(data);
                    break;
                case 'wiki.weapons':
                    weaponsData.push(data);
                    break;
                default:
                    break;
            }
        });

        setArmorTableContent(armorData);
        setHatsTableContent(hatsData);
        setSkillsTableContent(skillsData);
        setVigiTableContent(vigiData);
        setWeaponsTableContent(weaponsData);
    };

    useEffect(() => {
        if (!selectedClass) return;

        const currentClass = availableClasses.find((item) => item.name === selectedClass);
        if (!currentClass) return;

        // if data already fetched and saved in context
        if (wiki[currentClass.inContext].length > 0) {
            const data = wiki[currentClass.inContext];
            setCurrentClassContent({ currentClass, items: data });
            return;
        }

        const onSuccess = (response) => {
            const data = get(response, 'data', []);
            setCurrentClassContent({ currentClass, items: data });
            wiki[currentClass.set](data);
        };

        const onError = () => {};

        ApiHelper[currentClass.alias][currentClass.target]().then(onSuccess).catch(onError);
    }, [selectedClass]);

    const onSelectedClass = (className) => {
        setSelectedClass(className);
    };

    const onSelectedItem = ({ itemName, itemToggle }) => {
        setSelectedItem(itemName);
        setToggle(!itemToggle);
    };

    const SetupsItem =
        wiki.setups && wiki.setups.length > 0 ? (
            wiki.setups.map((item) => (
                <div className="page-text page-text-center blog-page" key={uuidv4()}>
                    {parse(marked(item.instructions, markedConfig))}
                </div>
            ))
        ) : (
            <></>
        );

    const GameUIItem =
        wiki.gameUIs && wiki.gameUIs.length > 0 ? (
            wiki.gameUIs.map((item) => (
                <div className="page-text page-text-center blog-page" key={uuidv4()}>
                    {parse(marked(item.instructions, markedConfig))}
                </div>
            ))
        ) : (
            <></>
        );

    const ClassesItem = (
        <div className="wiki-menu-tab">
            <div className="weapons-img-tab flex-s-c">
                {/* <span className="a" onClick={() => onSelectedClass('ghost-fighters')}>
                    <img src={Sword} alt="" />{' '}
                </span>
                <span className="a" onClick={() => onSelectedClass('mages')}>
                    <img src={Sword2} alt="" />{' '}
                </span>
                <span className="a" onClick={() => onSelectedClass('swordsmen')}>
                    <img src={Sword} alt="" />{' '}
                </span>
                <span className="a" onClick={() => onSelectedClass('warriors')}>
                    <img src={Sword2} alt="" />{' '}
                </span> */}
                <button
                    className={`button_cart ${
                        selectedClass === 'ghost-fighters' ? 'button_active' : ''
                    }`}
                    onClick={() => onSelectedClass('ghost-fighters')}
                >
                    Ghost Fighters
                </button>
                <button
                    className={`button_cart ${selectedClass === 'mages' ? 'button_active' : ''}`}
                    onClick={() => onSelectedClass('mages')}
                >
                    Mages
                </button>
                <button
                    className={`button_cart ${
                        selectedClass === 'swordsmen' ? 'button_active' : ''
                    }`}
                    onClick={() => onSelectedClass('swordsmen')}
                >
                    Swordsmen
                </button>
                <button
                    className={`button_cart ${selectedClass === 'warriors' ? 'button_active' : ''}`}
                    onClick={() => onSelectedClass('warriors')}
                >
                    Warriors
                </button>
            </div>
        </div>
    );

    const ItemCatgories = selectedClass ? (
        <>
            <div className="wiki-menu-tab">
                <div className="weapons-img-tab flex-s-c item-categories">
                    {itemCategories.map((item) => (
                        <span
                            className="a"
                            onClick={() => {
                                onSelectedItem({ itemName: item.name, itemToggle: toggle });
                                setSelectedTab('Items');
                            }}
                            key={uuidv4()}
                        >
                            <img src={item.image} alt="" />
                        </span>
                    ))}
                </div>
            </div>
            {/* <p className="back-button" onClick={() => setSelectedClass('')}>
                Go Back
            </p> */}
        </>
    ) : (
        <></>
    );

    const prepareTableComponent = () => (
        <>
            <WikiArmor content={armorTableContent} category={selectedItem} />
            <WikiHats content={hatsTableContent} category={selectedItem} />
            <WikiSkills content={skillsTableContent} category={selectedItem} />
            <WikiVigi content={vigiTableContent} category={selectedItem} />
            <WikiWeapons content={weaponsTableContent} category={selectedItem} />
        </>
    );

    const ItemDetails = selectedClass ? prepareTableComponent() : <></>;

    const SystemsDetails = (
        <div>
            <p>SystemsDetails goes here. </p>
        </div>
    );

    const InfoText =
        selectedTab === 'Classes' ? (
            <div className="page-text page-text-center">
                <p>Click an image to browse to the class of your choice!</p>
            </div>
        ) : (
            <></>
        );

    return (
        <div className="wiki-page-content">
            <div className="page-top">WIKI</div>
            <div className="text-text">
                <div className="page-text">
                    {/* <p>
                        In this page we will have all the information about the game, so we make a
                        Tabs bar for each section in the game. (Setup, Game UI, Classes, Items, etc)
                    </p> */}
                    {/* {InfoText} */}
                </div>
                <div className="menu-news-n">
                    <div className="menu-news flex-s-c">
                        <li
                            className={`${selectedTab === 'Setup' ? 'active-news' : ''}`}
                            onClick={() => setSelectedTab('Setup')}
                        >
                            <span className="a">Setup</span>
                        </li>
                        <li
                            className={`${selectedTab === 'Game UI' ? 'active-news' : ''}`}
                            onClick={() => setSelectedTab('Game UI')}
                        >
                            <span className="a">Game UI</span>
                        </li>
                        <li
                            className={`${selectedTab === 'Classes' ? 'active-news' : ''}`}
                            onClick={() => setSelectedTab('Classes')}
                        >
                            <span className="a">Classes</span>
                        </li>
                        <li
                            className={`${selectedTab === 'Systems' ? 'active-news' : ''}`}
                            onClick={() => setSelectedTab('Systems')}
                        >
                            <span className="a">Systems</span>
                        </li>
                    </div>
                </div>
                {selectedTab === 'Setup' ? SetupsItem : <></>}
                {selectedTab === 'Game UI' ? GameUIItem : <></>}
                {selectedTab === 'Classes' ? (
                    <>
                        {ClassesItem}
                        {ItemDetails}
                    </>
                ) : (
                    <></>
                )}
                {/* {selectedTab === 'Classes' ? ItemCatgories : <></>} */}
                {/* {selectedTab === 'Items' ? ItemDetails : <></>} */}
                {selectedTab === 'Systems' ? SystemsDetails : <></>}
                {/* {ItemDetails} */}
            </div>
        </div>
    );
}
