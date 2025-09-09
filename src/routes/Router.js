import React, { lazy } from 'react';
import { Navigate, createBrowserRouter, useParams } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* Layouts */
const FrontLayout = Loadable(lazy(() => import('../layouts/front/FrontLayout')));
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* Front pages */
const Home = Loadable(lazy(() => import('../views/frontend/Home')));
const BlogPage = Loadable(lazy(() => import('../views/frontend/BlogPage')));
const PostView = Loadable(lazy(() => import('../views/apps/blog/PostView')));
const About = Loadable(lazy(() => import('../views/frontend/About')));
const Portfolio = Loadable(lazy(() => import('../views/frontend/Portfolio')));
const Pricing = Loadable(lazy(() => import('../views/frontend/Pricing')));
const Contact = Loadable(lazy(() => import('../views/frontend/Contact')));

/* Admin / Auth */
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const ErrorPage = Loadable(lazy(() => import('../views/authentication/Error')));

/* Redirección legacy /apps/blog/post/:slug -> /post/:slug */
function LegacyPostRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/post/${slug}`} replace />;
}

const routes = [
  // Front
  {
    path: '/',
    element: <FrontLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'blog', element: <BlogPage /> },
      { path: 'post/:slug', element: <PostView /> },
      { path: 'about', element: <About /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'contact', element: <Contact /> },
    ],
  },

  // 🔁 Soporta URL vieja
  { path: '/apps/blog/post/:slug', element: <LegacyPostRedirect /> },

  // Admin
  {
    path: '/admin',
    element: <FullLayout />,
    children: [
      { index: true, element: <Navigate to="sample-page" replace /> },
      { path: 'sample-page', element: <SamplePage /> },
      { path: '*', element: <Navigate to="sample-page" replace /> },
    ],
  },

  // Auth + 404
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <ErrorPage /> },
      { path: '*', element: <Navigate to="/auth/404" replace /> },
    ],
  },

  { path: '*', element: <Navigate to="/auth/404" replace /> },
];

const router = createBrowserRouter(routes);
export { routes };
export default router;
