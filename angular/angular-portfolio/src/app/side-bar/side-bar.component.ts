import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootActions, selectRootState } from '../../store/root.actions';
import { faClose, faCode, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-side-bar',
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})


export class SideBarComponent implements OnInit {
  rootState$ = this.store.select(selectRootState);
  sidebarIsOpen = false;
  faClose = faClose;
  faCode = faCode;
  faMoneyBill = faMoneyBill;
  constructor(private store: Store) {}
  ngOnInit() {
    this.rootState$.subscribe((state) => {
      console.log('here', state);
      this.sidebarIsOpen = state.sidebarState.sidebarIsOpen;
    });
  }
  toggleSideBar() {
    this.store.dispatch(RootActions.toggleSideBar());
  }
}
