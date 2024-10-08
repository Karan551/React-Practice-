import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
// import './index.css';
import "./styles.css";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";

import { postData } from "./data.js";

import { About, ErrorPage, Home, Helper, PostPage, NewPost, EditPost } from "./Components/index.js";

/* const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{
      index: true,
      element: <Home posts={Helper()} />
    },
    {
      path: "about",
      element: <About />,
    },
    {
      path: "post",
      element: <NewPost />
    },
   
    {
      path: "/post/:id",
      element: <PostPage />
    }
    ]

  }
]); */

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />} >

    <Route index={true} element={<Home />} />

    <Route path="post" element={<NewPost />} />
    <Route path="post/:id" element={<PostPage />} />
    <Route path="edit-post/:id" element={<EditPost />} />
    <Route path="about" element={<About />} />

  </Route>
));


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);