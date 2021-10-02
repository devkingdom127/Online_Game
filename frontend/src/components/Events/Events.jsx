import parse from 'html-react-parser';
import marked from 'marked';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ApiHelper from '../../data/ApiHelper';
import ENV from '../../utilities/environment';
import { getDate } from '../../utilities/getDate';
import markedConfig from '../../utilities/markedConfig';
import './Events.css';

function Event() {
    const [post, setPost] = useState({
        isLoading: true,
        data: [],
        error: '',
    });
    const { id } = useParams();
    const { pathname } = useLocation();

    const category = pathname.split('/')[1];

    useEffect(() => {
        const onSuccess = (response) => {
            const { data } = response;
            setPost({
                isLoading: false,
                data,
                err: '',
            });
        };

        const onError = (error) => {
            const { message } = error;
            setPost({
                isLoading: false,
                data: [],
                err: message,
            });
        };

        const params = {
            id,
        };

        ApiHelper[category][category === 'events' ? 'getEvents' : 'getNews'](params)
            .then(onSuccess)
            .catch(onError);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { 0: data } = post.data;

    const MarkedHTML = () =>
        parse(marked(category === 'events' ? data.description : data.content, markedConfig));

    return (
        <div className="page-content">
            <div className="page-top">{category.toUpperCase()}</div>
            {/* eslint-disable-next-line no-nested-ternary */}
            {post.isLoading ? (
                <></>
            ) : data ? (
                <div className="text-text">
                    <div className="page-title">
                        <span className="page-title-news">{data.title}</span>
                    </div>

                    <div className="page-text">
                        <img
                            src={
                                category === 'events'
                                    ? data.cover_image
                                    : `${ENV.apiURL}${data.cover.url}`
                            }
                            alt=""
                            className="post-image"
                        />

                        <MarkedHTML />

                        <div className="page-title-time">
                            <span>{getDate(data.published_at)}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No Data Found</p>
            )}
        </div>
    );
}

export default Event;
