import { Component } from '@angular/core';
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
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
  constructor(private store: Store) {}
  toggleSideBar() {
    this.store.dispatch(RootActions.toggleSideBar());
  }

  gotoReact() {
    const page = window.location.href.split('/')[3];
    if (page === 'bucklite') {
      window.location.href = 'http://localhost:5173/bucklite';
    } else if (page === 'components') {
      window.location.href = 'http://localhost:5173/components';
    } else {
      window.location.href = 'http://localhost:5173/';
    }
  }
}

