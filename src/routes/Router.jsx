import React, { lazy } from 'react';
import { createBrowserRouter, Navigate, useParams } from 'react-router-dom';

const FrontLayout = lazy(() => import('../layouts/front/FrontLayout.jsx'));
const Home       = lazy(() => import('../views/frontend/Home.jsx'));
const BlogPage   = lazy(() => import('../views/frontend/BlogPage.jsx'));
const PostView   = lazy(() => import('../views/apps/blog/PostView.jsx'));

function LegacyPostRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/post/${slug}`} replace />;
}

const routes = [
  {
    path: '/',
    element: <FrontLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'post/:slug', element: <PostView /> },
    ],
  },
  { path: '/apps/blog/post/:slug', element: <LegacyPostRedirect /> },
  { path: '*', element: <Navigate to="/" replace /> }
];

const router = createBrowserRouter(routes);
export default router;
