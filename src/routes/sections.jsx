import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
import useProtectedRoute from './hooks/use-protected-route';
import Spinner from 'src/components/Spinner/Spinner';

export const LandingPage = lazy(() => import('../pages/landing'));
export const IndexPage = lazy(() => import('../pages/app'));
export const BlogPage = lazy(() => import('..//pages/blog'));
export const UserPage = lazy(() => import('..//pages/user'));
export const LoginPage = lazy(() => import('../pages/login'));
export const PhonePage = lazy(() => import('../pages/phone'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const Page404 = lazy(() => import('../pages/page-not-found'));
export const PhoneViewPost = lazy(() => import('../pages/phone-view-post'));
const VerifyEmail = lazy(() => import('src/pages/verify-email'));
const ResetPassword = lazy(() => import('src/pages/reset-password'));

// ----------------------------------------------------------------------

export default function Router() {
  const { ProtectedRoute } = useProtectedRoute();

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <ProtectedRoute element={<IndexPage />} />, index: true },
        { path: 'user', element: <ProtectedRoute element={<UserPage />} /> },
        { path: 'products', element: <ProtectedRoute element={<ProductsPage />} /> },
        { path: 'blog', element: <ProtectedRoute element={<BlogPage />} /> },
        { path: 'phone', element: <ProtectedRoute element={<PhonePage />} /> },
      ],
    },
    {
      path: 'post/:phoneId',
      element: <PhoneViewPost />,
    },
    {
      path: 'user/verify-email',
      element: <VerifyEmail />,
    },
    {
      path: 'user/reset-password',
      element: <ResetPassword />,
    },
    {
      path: 'products',
      element: <ProductsPage />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    { path: 'landing-page', element: <LandingPage /> },
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
