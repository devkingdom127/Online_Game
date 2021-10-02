import React from 'react';
import ENV from '../../utilities/environment';
import WikiClassTable from './WikiClassTable';
import './WikiMenu.css';

export default function WikiSkills(props) {
    const { content } = props;

    const TableItems =
        Array.isArray(content) && content.length > 0 ? (
            content.map((item) => (
                <tr>
                    <td>
                        <div className="content-shop-item-img">
                            <img
                                src={`${ENV.apiURL}${item.image.url}`}
                                alt=""
                                style={{ maxWidth: '100%' }}
                            />
                        </div>
                    </td>{' '}
                    <td>{item.name}</td>
                    <td className="td-td">{item.details}</td>
                    <td className="td-td">{item.description}</td>
                </tr>
            ))
        ) : (
            <></>
        );
    return (
        <WikiClassTable title="Skill">
            <table className="table-items">
                <tr>
                    <th colSpan="1">SKILL IMAGE</th> <th colSpan="1">SKILL NAME</th>{' '}
                    <th colSpan="1">SKILL DETAILS</th> <th colSpan="1">SKILL DESCRIPTION</th>
                </tr>
                {TableItems}
            </table>
        </WikiClassTable>
    );
}
