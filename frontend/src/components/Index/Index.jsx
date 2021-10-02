import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../../context/AppContext';
import ApiHelper from '../../data/ApiHelper';
import ENV from '../../utilities/environment';
import TopGuilds from '../TopGuilds/TopGuilds';
import TopPets from '../TopPets/TopPets';
import TopPlayers from '../TopPlayers/TopPlayers';
import './Index.css';
import Post from './Post/Post';

const color = '#ffffff';
SwiperCore.use([Navigation, Pagination, Autoplay]);

export default function Index() {
    const [events, setEvents] = useState({
        isLoading: true,
        data: [],
        err: '',
    });
    const [news, setNews] = useState({
        isLoading: true,
        data: [],
        err: '',
    });

    const [activeTab, setActiveTab] = useState('news');
    const prevEl = useRef(null);
    const nextEl = useRef(null);
    const { youtubeVideos, bannerPosts } = useContext(AppContext);

    useEffect(() => {
        const onSuccess = (response, setState) => {
            const { data } = response;
            setState({
                isLoading: false,
                data,
                err: '',
            });
        };

        const onError = (error, setState) => {
            const { message } = error;
            setState({
                isLoading: false,
                data: [],
                err: message,
            });
        };

        const params = {
            _sort: 'published_at:DESC',
            _limit: 7,
        };

        ApiHelper.news
            .getNews(params)
            .then((response) => onSuccess(response, setNews))
            .catch((error) => onError(error, setNews));
        ApiHelper.events
            .getEvents(params)
            .then((response) => onSuccess(response, setEvents))
            .catch((error) => onError(error, setEvents));
    }, []);

    const YoutubeVideo = (item) => (
        <Popup
            // eslint-disable-next-line react/no-array-index-key
            position="center center"
            modal
            contentStyle={{
                background: 'none',
                padding: 0,
                width: '1200px',
                margin: '0 auto',
                marginTop: '100px',
                pointerEvents: 'none',
            }}
            trigger={
                <div className="video block-4">
                    <span className="a">
                        <img src={`${ENV.apiURL}${item.video_img}`} alt="" />
                    </span>
                </div>
            }
            key={uuidv4()}
        >
            <div>
                <ReactPlayer url={`${item.video_url}`} width="1200px" height="500px" controls />
            </div>
        </Popup>
    );

    const BannerPosts =
        bannerPosts.length > 0 ? (
            <div className="swiper-container">
                <Swiper
                    autoplay={{ delay: 3000 }}
                    speed={1000}
                    className="swiper-slider"
                    navigation={{
                        prevEl: prevEl.current ? prevEl.current : undefined,
                        nextEl: nextEl.current ? nextEl.current : undefined,
                    }}
                    onInit={(swiper) => {
                        // eslint-disable-next-line no-param-reassign
                        swiper.params.navigation.prevEl = prevEl.current;
                        // eslint-disable-next-line no-param-reassign
                        swiper.params.navigation.nextEl = nextEl.current;
                        swiper.navigation.update();
                    }}
                    pagination={{ clickable: true }}
                >
                    <div className="swiper-wrapper">
                        {bannerPosts.map((item) => {
                            const itemPath = item.event ? 'events' : 'news';
                            const itemCategory = item.event ? 'event' : 'newsitem';
                            return (
                                <SwiperSlide
                                    className="swiper-slide"
                                    style={{
                                        backgroundImage: `url(${ENV.apiURL}${item.Image.url})`,
                                    }}
                                    key={uuidv4()}
                                >
                                    <h2>{item.Title.toUpperCase()}</h2>
                                    <div className="slider-info">
                                        <p>{item.Description}</p>
                                        <Link
                                            to={`/${itemPath}/${item[itemCategory].id}`}
                                            className="slider-button-more button-small a"
                                        >
                                            more
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                        )
                    </div>
                    {/* <!-- Add Pagination --> */}
                    {/* <div className="swiper-pagination" /> */}
                    <div className="swiper-button-next slider-button" ref={nextEl} />
                    <div className="swiper-button-prev slider-button" ref={prevEl} />
                    {/* <!-- Add Arrows --> */}
                </Swiper>
                {/* <!--swiper-slider--> */}
            </div>
        ) : (
            <></>
        );

    const YoutubeVideoItems = () => {
        const arr = [
            {
                video_img: youtubeVideos.Video_one_img.url,
                video_url: youtubeVideos.video_one,
                id: 23764,
            },
            {
                video_img: youtubeVideos.Video_two_img.url,
                video_url: youtubeVideos.video_two,
                id: 53764,
            },
            {
                video_img: youtubeVideos.Video_three_img.url,
                video_url: youtubeVideos.video_three,
                id: 33524,
            },
        ];
        const videos = arr.map((item) => YoutubeVideo(item));
        return videos;
    };

    return (
        <>
            <div className="top-content">
                {BannerPosts}
                <div className="news-top">
                    {/* <!--Last News--> */}
                    <div className="news-top-title">
                        <a href="/" className="tab-more bright">
                            +
                        </a>
                        <span
                            className={`tab-button ${activeTab === 'news' ? 'active' : ''}`}
                            data-tab="news"
                            onClick={() => setActiveTab('news')}
                            aria-hidden="true"
                        >
                            Last News
                        </span>
                        <p className="pp">/</p>
                        <span
                            className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
                            data-tab="events"
                            onClick={() => setActiveTab('events')}
                            aria-hidden="true"
                        >
                            Events
                        </span>
                    </div>
                    {activeTab === 'news' && news.isLoading ? (
                        <div className="loading-state">
                            <ClipLoader
                                color={color}
                                loading={events.isLoading}
                                // css={override}
                                size={30}
                            />
                        </div>
                    ) : (
                        <div
                            className={`${
                                activeTab === 'news' ? 'active' : ''
                            } news-top-text tab-block`}
                            id="news"
                            onClick={() => setActiveTab('news')}
                            aria-hidden="true"
                            // data-tab="news"
                        >
                            {news.data.length > 0 ? (
                                news.data.map((item) => (
                                    <Post
                                        key={uuidv4()}
                                        id={item.id}
                                        category="news"
                                        title={item.title}
                                        url={`/news/${item.id}`}
                                        publishedAt={item.published_at}
                                    />
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                    )}
                    {activeTab === 'events' && events.isLoading ? (
                        <div className="loading-state">
                            <ClipLoader
                                color={color}
                                loading={events.isLoading}
                                // css={override}
                                size={30}
                            />
                        </div>
                    ) : (
                        <div
                            className={`${
                                activeTab === 'events' ? 'active' : ''
                            } news-top-text tab-block`}
                            id="events"
                            // data-tab="events"
                        >
                            {events.data.length > 0 ? (
                                events.data.map((item) => (
                                    <Post
                                        key={uuidv4()}
                                        id={item.id}
                                        category="events"
                                        title={item.title}
                                        url={`/events/${item.id}`}
                                        publishedAt={item.published_at}
                                    />
                                ))
                            ) : (
                                <></>
                            )}
                        </div>
                    )}
                </div>
                {/* <!--END Last News--> */}
            </div>

            <div className="blockStat">
                <div className="homeTitle flex-s-c">
                    <h2>
                        <span>TOP</span> PAGES
                    </h2>
                </div>
                <div className="container-home">
                    <TopPlayers />
                    <TopPets />
                    <TopGuilds />
                    {/* <!--END TOP GUILDS--> */}
                </div>
            </div>

            <div className="blockVideo">
                <div className="homeTitle flex-s-c">
                    <h2>
                        <span>VIDEO</span> GUIDES
                    </h2>
                </div>
                <div className="container-home">
                    {youtubeVideos ? <>{YoutubeVideoItems()}</> : <></>}
                </div>
                {/* <!--container--> */}
            </div>
        </>
    );
}
