import React from 'react';
import { Link } from 'react-router-dom';
import { getDate } from '../../../utilities/getDate';
import './Post.css';

export default function Post(props) {
    const { url, category, title, publishedAt } = props;

    return (
        <div className="news flex-s-c">
            <Link to={url} className="a">
                <span className="news-1">[{category.toUpperCase()}] </span> {title}
            </Link>
            <span className="date">{getDate(publishedAt)}</span>
        </div>
    );
}
