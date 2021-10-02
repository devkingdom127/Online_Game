import React from 'react';
import ENV from '../../utilities/environment';
import WikiClassTable from './WikiClassTable';
import './WikiMenu.css';

export default function WikiArmor(props) {
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
                    <td>{item.defense}</td>
                    <td>{item.durability}</td>
                    <td>{item.level}</td>
                    <td>{item.stamina}</td>
                </tr>
            ))
        ) : (
            <></>
        );

    return (
        <WikiClassTable title="Armor">
            <table className="table-items">
                <tr>
                    <th rowSpan="2">ARMOR NAME</th> <th rowSpan="2">ARMOR</th>{' '}
                    <th colSpan="2">ARMOR STATS</th> <th colSpan="2">REQUIRED STATS</th>
                </tr>
                <tr>
                    <th className="table-items-tr">DEFENSE</th>{' '}
                    <th className="table-items-tr">DURABILITY</th>{' '}
                    <th className="table-items-tr">LEVEL</th>{' '}
                    <th className="table-items-tr">STAMINA</th>
                </tr>
                {TableItems}
            </table>
        </WikiClassTable>
    );
}
