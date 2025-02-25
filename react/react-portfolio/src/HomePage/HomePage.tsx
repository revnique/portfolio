import './HomePage.scss'
import { Link, Outlet } from 'react-router';

export function HomePage() {
  return <div className="home-page-container">
    <div className="header">
        <div className="header-left">
            <h1>Revnique's React Portfolio</h1>
        </div>
        <div className="header-right">
            <div className="logo-container">
                <img className="logo" src="/react-logo.png" alt="Revnique's React Portfolio" />
            </div>
            <div className="logo-container">
                <img className="logo" src="/angular-logo.png" alt="Revnique's Angular Portfolio" />
            </div>
        </div>
    </div>
    <div className="content">
        <div className="side-bar">
            <div>side nav</div>
            <ul>
                <li><Link to="/bucklite">BuckLite</Link></li>
                <li><Link to="/components">Components</Link></li>
            </ul>   
        </div>
        <div className="main-content">
            <Outlet />
        </div>
    </div>
  </div>;
}
