import React, { lazy } from 'react';
import Loadable from '../layouts/full/shared/loadable/Loadable';

const BlogPage = Loadable(lazy(() => import('../views/frontend/BlogPage'))); // ⬅️ Faltaba
const Posts = Loadable(lazy(() => import('../views/apps/blog/Posts')));
const PostView = Loadable(lazy(() => import('../views/apps/blog/PostView')));

// Rutas para integrar en el array children del FullLayout ('/')
const cmsRoutes = [
  { path: 'frontend/blog', element: <BlogPage /> }, // listado con tu HTML
  { path: 'apps/blog/posts', element: <Posts /> }, // listado MUI (opcional)
  { path: 'apps/blog/post/:slug', element: <PostView /> }, // detalle
  { path: 'p/:slug', element: <PostView /> }, // atajo
];

export default cmsRoutes;
