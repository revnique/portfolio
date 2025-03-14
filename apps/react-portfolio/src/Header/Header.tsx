import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faBars, faHome);
import { useDispatch } from 'react-redux';
import { toggleSideBar as toggleSideBarAction } from '../store/root.actions';
import { NavLink } from 'react-router';
export default function Header() {
    const dispatch = useDispatch();
    const toggleSideBar = () => {
        dispatch(toggleSideBarAction());
    }
    const page = window.location.href.split('/')[3];
    const isLocalhost = window.location.href.indexOf('http://localhost:') === 0;
    const url = isLocalhost ? 'http://localhost:5177' : 'https://angular.revnique.works';
    const goToAngular = () => {
        if (page === 'bucklite') {
          window.location.href = `${url}/bucklite`;
        } else if (page === 'components') {
          window.location.href = `${url}/components`;
        } else if (page === 'events') {
          window.location.href = `${url}/events`;
        } else {
          window.location.href = `${url}/`;
        }
    }
    return (
        <div className="header">
            <div className="side-bar-toggle" onClick={toggleSideBar}><FontAwesomeIcon className="fa-icon" icon={faBars} /></div>
            <div className="header-left">
                <div className="home-link">
                    <NavLink to="/"><FontAwesomeIcon className="fa-icon" icon={faHome} /></NavLink>
                </div>
                <div className="header-title">
                    <h1>React Portfolio</h1>
                </div>
            </div>
            <div className="header-right">
                <div className="logo-container selected">
                    <img className="logo" src="/react-logo.png" alt="Revnique's React Portfolio" />
                </div>
                <div className="logo-container">
                    <img className="logo" src="/angular-logo.png" alt="Revnique's Angular Portfolio" onClick={goToAngular} />
                </div>
            </div>
        </div>
    )
}