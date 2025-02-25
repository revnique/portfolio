import './HomePage.scss'

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
        </div>
        <div className="main-content">
            <div className="main-content-header">
                <div>main content header</div>
            </div>
            <div className="main-content-body">
                <div>main content body</div>
            </div>
        </div>
    </div>
  </div>;
}
