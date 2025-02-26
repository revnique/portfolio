import './HomePage.scss'
import { NavLink, Outlet } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faCode, faClose, faBars } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { useState } from 'react';

library.add(faMoneyBill, faCode, faClose, faBars);
export function HomePage() {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const toggleSideBar = () => {
        setSideBarOpen(!sideBarOpen);
    }
    const gotToAngular = () => {
        window.location.href = 'http://localhost:5177';
    }
    return <div className="home-page-container">
        <div className="header">
            <div className="side-bar-toggle" onClick={toggleSideBar}><FontAwesomeIcon className="fa-icon" icon="bars" /></div>
            <div className="header-left">
                <h1>Revnique's React Portfolio</h1>
            </div>
            <div className="header-right">
                <div className="logo-container selected">
                    <img className="logo" src="/react-logo.png" alt="Revnique's React Portfolio" />
                </div>
                <div className="logo-container">
                    <img className="logo" src="/angular-logo.png" alt="Revnique's Angular Portfolio" onClick={gotToAngular} />
                </div>
            </div>
        </div>
        <div className="content">
            <div className={`side-bar ${sideBarOpen ? 'open' : 'closed'}`}>
                <div className="side-bar-header">Projects<FontAwesomeIcon className="fa-icon" icon="close" onClick={toggleSideBar} /></div>
                <ul>
                    <li><NavLink to="/bucklite" className={({ isActive }) => isActive ? 'selected' : ''}><FontAwesomeIcon className="fa-icon" icon="money-bill" /> BuckLite</NavLink></li>
                    <li><NavLink to="/components" className={({ isActive }) => isActive ? 'selected' : ''}><FontAwesomeIcon className="fa-icon" icon="code" /> Components</NavLink></li>
                </ul>
            </div>
            <div className="main-content">
                <Outlet />
            </div>
        </div>
    </div>;
}
