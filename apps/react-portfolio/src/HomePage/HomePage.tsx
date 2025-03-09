import './HomePage.scss'
import { Outlet, useLocation } from 'react-router';
import { faMoneyBill, faCode, faClose, faBars } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import DefaultPage from '../DefaultPage/DefaultPage';
library.add(faMoneyBill, faCode, faClose, faBars);
export function HomePage() {
    const queryClient = new QueryClient();
    const location = useLocation();
    return <div className="home-page-container">
        <Header />
        <div className="content">
            <SideBar />
            <div className="main-content">
                <QueryClientProvider client={queryClient}>
                    {location.pathname === '/' ? <DefaultPage /> : <Outlet />}
                </QueryClientProvider>
            </div>
        </div>
    </div>;
}
