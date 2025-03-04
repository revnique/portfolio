import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faBars);
import { useDispatch } from 'react-redux';
import { toggleSideBar as toggleSideBarAction } from '../store/root.actions';

export default function Header() {
    const dispatch = useDispatch();
    const toggleSideBar = () => {
        dispatch(toggleSideBarAction());
    }
    const gotToAngular = () => {
        const page = window.location.href.split('/')[3];
        if (page === 'bucklite') {
          window.location.href = 'http://localhost:5177/bucklite';
        } else if (page === 'components') {
          window.location.href = 'http://localhost:5177/components';
        } else {
          window.location.href = 'http://localhost:5177/';
        }
    }
    return (
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
    )
}