import './SideBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMoneyBill, faCode, faClose, faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSideBar as toggleSideBarAction } from '../store/root.actions';
import { RootState } from '../store/root.state';
library.add(faMoneyBill, faCode, faClose, faBars);

export default function SideBar() {
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state.reducer as RootState);
    const sideBarOpen = state.sidebarState.sidebarIsOpen;
    const toggleSideBar = () => {
        dispatch(toggleSideBarAction());
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