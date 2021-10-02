import React from 'react';
import ENV from '../../utilities/environment';
import WikiClassTable from './WikiClassTable';
import './WikiMenu.css';

export default function WikiHats(props) {
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
                    <td>{item.attack_rating}</td>
                    <td>{item.durability}</td>
                    <td>{item.level}</td>
                    <td>{item.dexterity}</td>
                </tr>
            ))
        ) : (
            <></>
        );

    return (
        <WikiClassTable title="Hat">
            <table className="table-items">
                <tr>
                    <th rowSpan="2">HAT NAME</th>
                    <th rowSpan="2">HAT</th>
                </tr>
                <tr>
                    <th className="table-items-tr">ATTACK RATING</th>{' '}
                    <th className="table-items-tr">DURABILITY</th>{' '}
                    <th className="table-items-tr">LEVEL</th>{' '}
                    <th className="table-items-tr">DEXTERITY</th>
                </tr>
                {TableItems}
            </table>
        </WikiClassTable>
    );
}
