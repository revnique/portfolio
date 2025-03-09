import { Component } from '@angular/core';
import { faBars, faClose, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RootActions } from '../../store/root.actions';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faBars = faBars;
  faClose = faClose;
  faHome = faHome;
  isLocalhost = window.location.href.indexOf('http://localhost:') === 0;
  url = this.isLocalhost ? 'http://localhost:5177' : 'https://angular.revnique.works';
  homeUrl = this.isLocalhost ? 'http://localhost:37777' : 'https://revnique.works';
  constructor(private store: Store) {}
  toggleSideBar() {
    this.store.dispatch(RootActions.toggleSideBar());
  }

  goToHome() {
    window.location.href = this.homeUrl;
  }

  gotoReact() {
    const page = window.location.href.split('/')[3];
    const url = window.location.href.includes('localhost') ? 'http://localhost:5173' : 'https://react.revnique.works';
    if (page === 'bucklite') {
      window.location.href = `${url}/bucklite`;
    } else if (page === 'components') {
      window.location.href = `${url}/components`;
    } else {
      window.location.href = `${url}/`;
    }
  }
}

