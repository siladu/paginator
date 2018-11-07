import React, {Suspense, useState} from 'react';
import './App.css';
// import Books from "./Books";
import {Paginator, PaginatorWithUrl} from "./paginator";

const Books = React.lazy(() => import('./Books'))

export default function App() {

    const data = [
        { name: "Annihilation", image: "https://images.gr-assets.com/books/1403941587l/17934530.jpg" },
        { name: "Authority", image: "https://images.gr-assets.com/books/1403941730l/18077769.jpg" },
        { name: "Acceptance", image: "https://images.gr-assets.com/books/1403941598l/18077752.jpg" },
        { name: "Surely You're Joking, Mr. Feynman!", image: "https://images.gr-assets.com/books/1348445281l/5544.jpg" },
        { name: "American Gods", image: "https://images.gr-assets.com/books/1462924585l/30165203.jpg" },
        { name: "Beowulf", image: "https://images.gr-assets.com/books/1327878125l/52357.jpg" },
        { name: "Katherine", image: "https://images.gr-assets.com/books/1436406825l/33609.jpg" },
        { name: "The Etymologicon", image: "https://images.gr-assets.com/books/1356841195l/12870068.jpg" },
        { name: "A Knight of the Severn Kingdoms", image: "https://images.gr-assets.com/books/1423281810l/18635622.jpg" },
        { name: "Game of Thrones", image: "http://covers.openlibrary.org/b/isbn/9780553588484-L.jpg" }, //https://images.gr-assets.com/books/1436732693l/13496.jpg
    ]

    //    <script src="https://www.googleapis.com/books/v1/volumes?q=harry+potter&callback=handleResponse"></script>

    const [content, setContent] = useState(data[0])
    const [toggle, setToggle] = useState(true)

    const getPageContent = (page) => setContent(data[page - 1])

    return (
        <Suspense maxDuration={100} fallback={<div>Loading...</div>}>
        <div className="App">
            { toggle ? (
                <React.Fragment>
                    <span>Driven by URL: <PaginatorWithUrl getPageContent={getPageContent} totalPages={10} /></span>
                    <button onClick={() => { setToggle(!toggle); resetQueryString() }}>Switch to internal state driven</button>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <span>Driven by internal state: <Paginator getPageContent={getPageContent} totalPages={10} /></span>
                    <button onClick={() => setToggle(!toggle) }>Switch to URL driven</button>
                </React.Fragment>
            ) }
            <br />
            <Suspense maxDuration={100} fallback={<div>Loading Books...</div>}>
                <Books content={content} />
            </Suspense>
        </div>
        </Suspense>
    );
}

const resetQueryString = () => window.history.pushState("", "", window.location.pathname.split("?")[0]);