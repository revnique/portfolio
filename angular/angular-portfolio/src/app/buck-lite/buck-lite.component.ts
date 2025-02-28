import { Component } from '@angular/core';

@Component({
  selector: 'app-buck-lite',
  standalone: true,
  imports: [],
  templateUrl: './buck-lite.component.html',
  styleUrl: './buck-lite.component.scss'
})
export class BuckLiteComponent {
  serialNumber: string = '';
  createDate: string = '';
  isFortWorth: boolean = false;

  save() {
    console.log('save');
  } 

  fetch() {
    console.log('fetch');
  } 

  fetchSingle() {
    console.log('fetchSingle');
  } 
  
  
}
