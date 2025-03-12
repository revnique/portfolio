import { Component } from '@angular/core';
import { ValueBarComponent } from '../value-bar/value-bar.component';
import { RevniqueCalendarComponent } from '../revnique-calendar/revnique-calendar.component';

@Component({
    selector: 'app-components-page',
    imports: [ValueBarComponent, RevniqueCalendarComponent],
    templateUrl: './components-page.component.html',
    styleUrl: './components-page.component.scss'
})
export class ComponentsPageComponent {
  valueBarPositiveHeight = 70;
  valueBarNegativeHeight = 30;

  updateValueBarPositiveHeight(value: number) {
    console.log(value);
    this.valueBarPositiveHeight = value;
    this.valueBarNegativeHeight = 100 - value;
    console.log(this.valueBarPositiveHeight, this.valueBarNegativeHeight);
  }
}
