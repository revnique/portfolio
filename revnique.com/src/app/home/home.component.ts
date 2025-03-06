import { Component, OnInit } from '@angular/core';
import { RevProject, RevService } from '../services/rev.service';
import { map } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  projects$: Observable<any> = EMPTY;
  constructor(private svc: RevService) { }

  ngOnInit() {
    this.projects$ = this.svc.getProjects();
  }
}
