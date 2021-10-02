import React from 'react';
import './WikiMenu.css';

export default function WikiClassTable(props) {
    const { title, children } = props;

    return (
        <div className="text-text class-table-content">
            <h2 className="class-table-title">{title}</h2>
            {children}
        </div>
    );
}
