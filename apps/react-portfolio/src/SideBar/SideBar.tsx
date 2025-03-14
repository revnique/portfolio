import './SideBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoneyBill, faCode, faClose, faBars, faGlobe, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar as toggleSideBarAction } from '../store/root.actions';
import { RootState } from '../store/root.state';
library.add(faMoneyBill, faCode, faClose, faBars, faGlobe, faCalendar);

export default function SideBar() {
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state.reducer as RootState);
    const sideBarOpen = state.sidebarState.sidebarIsOpen;
    const toggleSideBar = () => {
        dispatch(toggleSideBarAction());
    }
    const isLocalhost = window.location.href.indexOf('http://localhost:') === 0;
    const homeUrl = isLocalhost ? 'http://localhost:37777' : 'https://revnique.works';
    const goToHome = () => {
        window.location.href = `${homeUrl}/`;
    }
    
    return (
        <div className={`side-bar ${sideBarOpen ? 'open' : 'closed'}`}>
        <div className="side-bar-header">Projects<FontAwesomeIcon className="fa-icon" icon="close" onClick={toggleSideBar} /></div>
        <ul>
            <li><NavLink to="/bucklite" className={({ isActive }) => isActive ? 'selected' : ''}><span><FontAwesomeIcon className="fa-icon" icon="money-bill" /></span>BuckLite</NavLink></li>
            <li><NavLink to="/components" className={({ isActive }) => isActive ? 'selected' : ''}><span><FontAwesomeIcon className="fa-icon" icon="code" /></span>Components</NavLink></li>
            <li><NavLink to="/events" className={({ isActive }) => isActive ? 'selected' : ''}><span><FontAwesomeIcon className="fa-icon" icon="calendar" /></span>Events</NavLink></li>
        </ul>
        <div className="side-bar-footer" onClick={goToHome}>
            <FontAwesomeIcon className="fa-icon" icon="globe" />
            <a href={homeUrl}>https://revnique.works</a>
        </div>
    </div>
    )
}