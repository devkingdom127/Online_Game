import parse from 'html-react-parser';
import get from 'lodash/get';
import marked from 'marked';
import React, { useEffect, useState } from 'react';
import ApiHelper from '../../data/ApiHelper';
import markedConfig from '../../utilities/markedConfig';
import './Download.css';

export default function Download() {
    const [downloadLinks, setDownloadLinks] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [downloadGuide, setDownloadGuide] = useState({});
    const title = get(downloadGuide, 'Title', '');
    const description = get(downloadGuide, 'Description', '');
    const body = get(downloadGuide, 'Body', '');

    useEffect(() => {
        const onSuccessLinks = (responseLinks) => {
            const data = get(responseLinks, 'data', []);
            setDownloadLinks(data);
        };

        const onErrorLinks = () => {};

        const onSuccessGuide = (responseGuide) => {
            const data = get(responseGuide, 'data', {});
            setDownloadGuide(data);
        };

        const onErrorGuide = () => {};

        ApiHelper.downloadLinks.getDownloadLinks().then(onSuccessLinks).catch(onErrorLinks);
        ApiHelper.downloadGuide.getDownloadGuide().then(onSuccessGuide).catch(onErrorGuide);
    }, []);

    const DownloadLinks =
        downloadLinks.length > 0 ? (
            downloadLinks.map((item) => (
                <div className="download-block-1 flex-c-c">
                    <div className="client-text flex-c-c">
                        {item.Title}
                        <span>({item.Website})</span>
                    </div>
                    <div className="button-download">
                        {/* eslint-disable-next-line react/jsx-no-target-blank */}
                        <a href={`${item.Url}`} className="button_top_block" target="_blank">
                            Download
                        </a>
                    </div>
                </div>
            ))
        ) : (
            <></>
        );

    const GuideTitle = title ? (
        <div className="page-title">
            <span className="page-title-news flex-c-c">{title}</span>
        </div>
    ) : (
        <></>
    );

    const GuideDescription = description ? <p>{description}</p> : <></>;

    const GuideBody = body ? (
        <div className="page-text page-text-center">
            <p>{parse(marked(downloadGuide.Body, markedConfig))}</p>
        </div>
    ) : (
        <></>
    );

    return (
        <div className="page-content">
            <div className="page-top">Download</div>
            <div className="text-text">
                {GuideTitle}
                <div className="downloadBlock">
                    {GuideDescription}
                    {DownloadLinks}
                    {GuideBody}
                </div>
            </div>
        </div>
    );
}
