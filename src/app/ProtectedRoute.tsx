import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/store';

export function ProtectedRoute() {
    const userId = useAppSelector((state) => state.user.userId);

    if (!userId) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}