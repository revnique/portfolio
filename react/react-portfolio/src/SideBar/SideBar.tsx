import './SideBar.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoneyBill, faCode, faClose, faBars } from '@fortawesome/free-solid-svg-icons';
library.add(faMoneyBill, faCode, faClose, faBars);

export default function SideBar() {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const toggleSideBar = () => {
        setSideBarOpen(!sideBarOpen);
    }
    
    return (
        <div className={`side-bar ${sideBarOpen ? 'open' : 'closed'}`}>
        <div className="side-bar-header">Projects<FontAwesomeIcon className="fa-icon" icon="close" onClick={toggleSideBar} /></div>
        <ul>
            <li><NavLink to="/bucklite" className={({ isActive }) => isActive ? 'selected' : ''}><FontAwesomeIcon className="fa-icon" icon="money-bill" /> BuckLite</NavLink></li>
            <li><NavLink to="/components" className={({ isActive }) => isActive ? 'selected' : ''}><FontAwesomeIcon className="fa-icon" icon="code" /> Components</NavLink></li>
        </ul>
    </div>
    )
}