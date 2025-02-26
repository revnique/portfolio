import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faClose, faCode, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FontAwesomeModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-portfolio';
  sideBarOpen = false;
  isActive = false;
  faBars = faBars;
  faClose = faClose;
  faCode = faCode;
  faMoneyBill = faMoneyBill;

  toggleSideBar() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  gotoReact() {
    const page = window.location.href.split('/')[3];
    if (page === 'bucklite') {
      window.location.href = 'http://localhost:5173/bucklite';
    } else if (page === 'components') {
      window.location.href = 'http://localhost:5173/components';
    }
  }
}
