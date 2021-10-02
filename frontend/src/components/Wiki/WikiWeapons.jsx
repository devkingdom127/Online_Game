import React from 'react';
import ENV from '../../utilities/environment';
import WikiClassTable from './WikiClassTable';
import './WikiMenu.css';

export default function WikiWeapons(props) {
    const { content } = props;

    const TableItems =
        Array.isArray(content) && content.length > 0 ? (
            content.map((item) => (
                <tr>
                    <td>{item.name}</td>{' '}
                    <td>
                        <div className="content-shop-item-img">
                            <img
                                src={`${ENV.apiURL}${item.image.url}`}
                                alt=""
                                style={{ maxWidth: '100%' }}
                            />
                        </div>
                    </td>{' '}
                    <td>{item.damage}</td>
                    <td>{item.durability}</td>
                    <td>{item.level}</td>
                    <td>{item.energy}</td>
                    <td>{item.strength}</td>
                </tr>
            ))
        ) : (
            <></>
        );

    return (
        <WikiClassTable title="Weapon">
            <table className="table-items">
                <tr>
                    <th rowSpan="2">WEAPONS NAME</th>
                    <th rowSpan="2">WEAPON</th>
                </tr>
                <tr>
                    <th className="table-items-tr">DAMAGE</th>
                    <th className="table-items-tr">DURABILITY</th>
                    <th className="table-items-tr">LEVEL</th>
                    <th className="table-items-tr">ENERGY</th>
                    <th className="table-items-tr">STRENGTH</th>
                </tr>
                {TableItems}
            </table>
        </WikiClassTable>
    );
}
