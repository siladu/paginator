import React, {useEffect, useState} from "react";
import {parse} from "query-string";

const queryObjToString = query => "?" + Object.keys(query).map(key => `${key}=${query[key]}`).join('&')

export const PaginatorWithUrl = ({totalPages = 1, getPageContent}) => {
    const search = window.location.search
    const query = parse(search)

    const onPageChange = (page) => {
        query.page = page
        const newUrl = window.location.pathname + queryObjToString(query)
        window.history.pushState("", `Page ${page}`, newUrl);
    }

    return <Paginator totalPages={totalPages}
                      getPageContent={getPageContent}
                      onPageChange={onPageChange}
                      initialPage={ Number(query.page) || 1 } />
}

export const Paginator = ({ totalPages = 1, getPageContent, onPageChange = () => {}, initialPage = 1 }) => {
    const spread = 5;

    const [page, setPage] = useState(initialPage);

    useEffect(() => {
        getPageContent(page)
    }, [page])

    const handlePage = page => {
        setPage(page)
        onPageChange(page)
    }

    const getNext = () => (page < totalPages ? handlePage(page + 1) : null);
    const getPrev = () => (page > 1 ? handlePage(page - 1) : null);
    const getPageFor = page => handlePage(page);
    const toPageLink = (i, index) => {
        const active = i === page;
        return active ? (
            <strong key={index}>
                <span onClick={() => getPageFor(i)}>{i}</span>
            </strong>
        ) : (
            <span key={index} onClick={() => getPageFor(i)}>{i}</span>
        );
    };

    const spreadOffset = i => i + page - Math.round(spread / 2 - 1);
    const withinBounds = i => i >= 1 && i <= totalPages;

    return (
        <div>
            <button onClick={() => handlePage(1)}>{"|<"}</button>
            <button onClick={getPrev}>{"<"}</button>
            {[...Array(spread).keys()]
                .map(spreadOffset)
                .filter(withinBounds)
                .map(toPageLink)}
            <button onClick={getNext}>{">"}</button>
            <button onClick={() => handlePage(totalPages)}>{">|"}</button>
        </div>
    );
}