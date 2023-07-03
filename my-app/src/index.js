import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './routes/root';
import Search from './routes/search';
import MyPage from './routes/my-page';
import SearchResult from './routes/search-result';
import DetailPage from './routes/detail-page';

const router = createBrowserRouter([
    {
        path: "/Capston",
        element: <Root />,
        children: [
            {
                path: "",
                element: <Search />,
            },
            {
                path: "My-page",
                element: <MyPage />,
            },
            {
                path: "Search-result",
                element: <SearchResult />,
            },
            {
                path: "Detail-page",
                element: <DetailPage />,
            },
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
