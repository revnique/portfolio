import './DefaultPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink, faHandPointUp } from '@fortawesome/free-solid-svg-icons';

export default function DefaultPage() {
    return (
        <div className="default-page">
            <div className="default-page-content">
                <div className="default-page-content-container">
                    <div className="inner-container">
                        <div className="default-page-title">This website demonstrates</div>
                        <ul>
                            <li>&mdash;&nbsp;React 18 with Redux state management</li>
                            <li>&mdash;&nbsp;Light/Dark theming based on computer defaults</li>
                            <li>&mdash;&nbsp;GraphQL API via AWS AppSync & DynamoDB</li>
                            <li>&mdash;&nbsp;Responsive Web Design targeting iPhone SE mobile viewport</li>
                            <li>&mdash;&nbsp;pixel perfect sister site built in Angular 19</li>
                            <li>&mdash;&nbsp;AWS Amplify deployment of Monorepo to separate subdomains</li>
                            <li className="external-link-container"><FontAwesomeIcon icon={faExternalLink} />&nbsp;
                                <a href="https://github.com/revnique/portfolio" target="_blank" rel="noopener noreferrer">https://github.com/revnique/portfolio</a>
                                <span className="external-link-text">
                                    &nbsp;[monorepo source]
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="hand-icon-container">
                <FontAwesomeIcon icon={faHandPointUp} className="hand-icon" />
                <div className="hand-icon-text">Angular Twin Site</div>
            </div>
        </div>
    );
}