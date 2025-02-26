import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faClose, faCode, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, CommonModule],
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
    window.location.href = 'http://localhost:5173';
  }
}
