import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { MainLayout } from '@/components/layout';
import { CatalogPage } from '@/pages/CatalogPage';
import {LoginPage} from "@/pages/LoginPage.tsx";
import {RegisterPage} from "@/pages/RegisterPage.tsx";
import {ProfileLayout} from "@/components/layout/profile/ProfileLayout.tsx";
import {ProfilePage} from "@/pages/ProfilePage.tsx";
import {ProtectedRoute} from "@/app/ProtectedRoute.tsx";
import {OrdersPage} from "@/pages/OrdersPage.tsx";
import {ProductPage} from "@/pages/ProductPage.tsx";
import {CartPage} from "@/pages/CartPage.tsx";
import {CheckoutPage} from "@/pages/CheckoutPage.tsx";
import {OrderSuccessPage} from "@/pages/OrderSuccessPage.tsx";
import {ProfileEditPage} from "@/pages/ProfileEditPage.tsx";

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <CatalogPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'product/:id', element: <ProductPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'profile',
            element: <ProfileLayout />,
            children: [
              { index: true, element: <ProfilePage /> },
              { path: 'edit', element: <ProfileEditPage /> },
              { path: 'orders', element: <OrdersPage /> },
              { path: 'cart', element: <CartPage /> },
            ],
          },
          { path: 'checkout', element: <CheckoutPage /> },
          { path: 'order-success', element: <OrderSuccessPage /> },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes as RouteObject[]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
