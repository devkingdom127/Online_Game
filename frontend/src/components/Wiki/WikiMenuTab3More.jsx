import React from 'react';
import ItemShop1 from '../../assets/images/item-shop-1.png';
import './WikiMenu.css';

export default function WikiMenuTab3More() {
    return (
        <div className="page-content">
            <div className="page-top">WIKI</div>
            <div className="text-text">
                <div className="page-text page-text-center">
                    <p>Click an image to brovce to the class of your choice!</p>
                </div>
                <table className="table-items">
                    <tr>
                        <th rowSpan="2">ARMORE NAME</th> <th rowSpan="2">ARMOR</th>{' '}
                        <th colSpan="2">ARMORE STATS</th> <th colSpan="2">REQUIRED STATS</th>
                    </tr>
                    <tr>
                        <th className="table-items-tr">DEFENSE</th>{' '}
                        <th className="table-items-tr">DURABILITY</th>{' '}
                        <th className="table-items-tr">LEVEL</th>{' '}
                        <th className="table-items-tr">STAMIN</th>
                    </tr>
                    <tr>
                        <td>Recuperation</td>{' '}
                        <td>
                            <div className="content-shop-item-img">
                                <img src={ItemShop1} alt="" />
                            </div>
                        </td>{' '}
                        <td>10</td> <td>360</td> <td>5</td> <td>2</td>
                    </tr>
                    <tr>
                        <td>Fast Movement</td>{' '}
                        <td>
                            <div className="content-shop-item-img">
                                <img src={ItemShop1} alt="" />
                            </div>
                        </td>{' '}
                        <td>10</td> <td>360</td> <td>5</td> <td>2</td>
                    </tr>
                    <tr>
                        <td>Poison Sting</td>{' '}
                        <td>
                            <div className="content-shop-item-img">
                                <img src={ItemShop1} alt="" />
                            </div>
                        </td>{' '}
                        <td>10</td> <td>360</td> <td>5</td> <td>2</td>
                    </tr>
                    <tr>
                        <td>Recuperation</td>{' '}
                        <td>
                            <div className="content-shop-item-img">
                                <img src={ItemShop1} alt="" />
                            </div>
                        </td>{' '}
                        <td>10</td> <td>360</td> <td>5</td> <td>2</td>
                    </tr>
                    <tr>
                        <td>Recuperation</td>{' '}
                        <td>
                            <div className="content-shop-item-img">
                                <img src={ItemShop1} alt="" />
                            </div>
                        </td>{' '}
                        <td>10</td> <td>360</td> <td>5</td> <td>2</td>
                    </tr>
                    <tr>
                        <td>Recuperation</td>{' '}
                        <td>
                            <div className="content-shop-item-img">
                                <img src={ItemShop1} alt="" />
                            </div>
                        </td>{' '}
                        <td>10</td> <td>360</td> <td>5</td> <td>2</td>
                    </tr>
                    <tr>
                        <td>Recuperation</td>{' '}
                        <td>
                            <div className="content-shop-item-img">
                                <img src={ItemShop1} alt="" />
                            </div>
                        </td>{' '}
                        <td>10</td> <td>360</td> <td>5</td> <td>2</td>
                    </tr>
                    <tr>
                        <td>Recuperation</td>{' '}
                        <td>
                            <div className="content-shop-item-img">
                                <img src={ItemShop1} alt="" />
                            </div>
                        </td>{' '}
                        <td>10</td> <td>360</td> <td>5</td> <td>2</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}
