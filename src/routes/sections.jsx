import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import useProtectedRoute from './hooks/use-protected-route';

export const IndexPage = lazy(() => import('../pages/app'));
export const BlogPage = lazy(() => import('..//pages/blog'));
export const UserPage = lazy(() => import('..//pages/user'));
export const LoginPage = lazy(() => import('../pages/login'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const Page404 = lazy(() => import('../pages/page-not-found'));

// ----------------------------------------------------------------------

// Mock authentication function, replace this with your actual authentication logic

export default function Router() {
  const { ProtectedRoute } = useProtectedRoute();

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={'loading'}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        // {index:true,element:<IndexPage/>}
        { element: <ProtectedRoute element={<IndexPage />} />, index: true },
        { path: 'user', element: <ProtectedRoute element={<UserPage />} /> },
        { path: 'products', element: <ProtectedRoute element={<ProductsPage />} /> },
        { path: 'blog', element: <ProtectedRoute element={<BlogPage />} /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
