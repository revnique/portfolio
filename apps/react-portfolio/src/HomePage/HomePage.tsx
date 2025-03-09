import './HomePage.scss'
import { Outlet } from 'react-router';
import { faMoneyBill, faCode, faClose, faBars } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from '../Header/Header';
import SideBar from '../SideBar/SideBar';
import DefaultPage from '../DefaultPage/DefaultPage';
library.add(faMoneyBill, faCode, faClose, faBars);

export function HomePage() {
    const queryClient = new QueryClient();
    const isLocalhost = window.location.href.indexOf('http://localhost:') === 0;
    const isRoot = (isLocalhost && window.location.href === 'http://localhost:5173/') || (!isLocalhost && window.location.href === 'https://react.revnique.works/');
    return <div className="home-page-container">
        <Header />
        <div className="content">
            <SideBar />
            <div className="main-content">
                <QueryClientProvider client={queryClient}>
                    {/* <h1>isRoot: {isRoot.toString()}</h1> */}
                    {isRoot ? <DefaultPage /> : <Outlet />}
                </QueryClientProvider>
            </div>
        </div>
    </div>;
}
