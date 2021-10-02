/* eslint-disable no-underscore-dangle */
import get from 'lodash/get';
import React, { useEffect, useState } from 'react';
import 'reactjs-popup/dist/index.css';
import { v4 as uuidv4 } from 'uuid';
import ApiHelper from '../../data/ApiHelper';
import ItemCard from './ItemCard';
import './ItemMall.css';
import ItemPackage from './ItemPackage';

export default function ItemMall() {
    const [packages, setPackages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Chests');
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    // const [totalProductsCount, setTotalProductsCount] = useState(0);
    // const [pageCount, setPageCount] = useState(0);
    // const [start, setStart] = useState(1);

    useEffect(() => {
        const onSuccessPackages = (response) => {
            const data = get(response, 'data', []);
            setPackages(data);
        };
        const onErrorPackages = () => {};

        const onSuccessCategoryNames = (response) => {
            const data = get(response, 'data', []);
            setCategories(data);
        };
        const onErrorCategoryNames = () => {};

        ApiHelper.packages.getPackages().then(onSuccessPackages).catch(onErrorPackages);
        ApiHelper.categoryNames
            .getCategoryNames()
            .then(onSuccessCategoryNames)
            .catch(onErrorCategoryNames);
    }, []);

    useEffect(() => {
        const params = {
            Name: selectedCategory,
        };

        const onSuccessGetProducts = (productsResponse) => {
            const data = get(productsResponse, 'data.0.products', []);
            setProducts(data);
        };
        const onErrorGetProducts = () => {};

        const onSuccessGetCount = (countResponse) => {
            // eslint-disable-next-line no-unused-vars
            const data = get(countResponse, 'data', 0);
            // setTotalProductsCount(data);
        };
        const onErrorGetCount = () => {};

        ApiHelper.categories
            .getCategories(params)
            .then(onSuccessGetProducts)
            .catch(onErrorGetProducts);

        const getCountParams = {
            categoris: {
                Name: selectedCategory,
            },
        };
        ApiHelper.categories
            .getCount(getCountParams)
            .then(onSuccessGetCount)
            .catch(onErrorGetCount);
    }, [selectedCategory]);

    // useEffect(() => {
    //     const _pageCount = Math.ceil(totalProductsCount / 9);
    //     setPageCount(_pageCount);
    // }, [totalProductsCount]);

    // useEffect(() => {
    //     const limit = 9;
    //     const params = {
    //         categories: {
    //             Name: selectedCategory,
    //         },
    //         start,
    //         _limit: limit,
    //     };

    //     const onSuccessGetProducts = (productsResponse) => {
    //         const data = get(productsResponse, 'data', []);
    //         setProducts(data);
    //     };

    //     const onErrorGetProducts = () => {};

    //     ApiHelper.categories
    //         .getCategories(params)
    //         .then(onSuccessGetProducts)
    //         .catch(onErrorGetProducts);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [start]);

    // const onPageChange = (page) => {
    //     const itemsPerPage = 9;
    //     const selectedPage = page.selected;
    //     setStart(Math.ceil(selectedPage * itemsPerPage));
    // };

    const Products =
        products.length > 0 ? (
            products.map((item) => {
                const videoTitle = get(item, 'Video_title', '');
                const video = get(item, 'Video[0].url', '');
                const videoMime = get(item, 'Video[0].mime', '');
                const image = get(item, 'Image.url', '');
                const props = {
                    id: item.id,
                    image,
                    name: item.Name,
                    description: item.Description,
                    price: item.Price,
                    ...(video ? { video } : {}),
                    ...(videoTitle ? { videoTitle } : {}),
                    ...(videoMime ? { videoMime } : {}),
                };

                // eslint-disable-next-line react/jsx-props-no-spreading
                return <ItemCard key={item.id} {...props} />;
            })
        ) : (
            <></>
        );

    return (
        <div className="page-content">
            <div className="page-top">Item mall</div>
            <div className="text-text">
                <div className="shop-top-block">
                    {packages.length > 0 ? (
                        packages.map((item) => (
                            <ItemPackage item={item} price={item.price} key={uuidv4()} />
                        ))
                    ) : (
                        <></>
                    )}
                </div>
                <div className="menu-news-n tab-scrollbar">
                    <div className="menu-news">
                        {categories.length > 0 ? (
                            categories.map((item) => (
                                <li
                                    key={item.id}
                                    className={`${
                                        selectedCategory === item.Name ? 'active-news' : ''
                                    } `}
                                >
                                    <span
                                        className="a"
                                        onClick={() => setSelectedCategory(item.Name)}
                                        role="button"
                                        tabIndex={item.id}
                                    >
                                        {item.Name}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="block-weapons-more">
                    <div className="block-weapons">{Products}</div>
                    {/* <ReactPaginate
                        previousLabel="prev"
                        nextLabel="next"
                        breakLabel="..."
                        breakClassName="break-me"
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={onPageChange}
                        containerClassName="pagination"
                        activeLinkClassName="active"
                        breakLinkClassName="page-numbers"
                        pageLinkClassName="page-numbers"
                        previousLinkClassName="page-numbers prev"
                        nextLinkClassName="page-numbers next"
                    /> */}
                </div>
            </div>
        </div>
    );
}
