import { Component } from '@angular/core';
import { ValueBarComponent } from '../value-bar/value-bar.component';
import { RevniqueCalendarComponent } from '../revnique-calendar/revnique-calendar.component';
import { CalendarEvent } from '../../store/portfolio-store/portfolio.state';

@Component({
    selector: 'app-components-page',
    imports: [ValueBarComponent, RevniqueCalendarComponent],
    templateUrl: './components-page.component.html',
    styleUrl: './components-page.component.scss'
})
export class ComponentsPageComponent {
  valueBarPositiveHeight = 70;
  valueBarNegativeHeight = 30;
  redDays: CalendarEvent[] = ['3/3/2025','3/8/2025','6/28/2025','6/29/2025','5/17/2025','5/28/2025','7/27/2025','7/11/2025'].map(d=>{
    return {
      eventDate: d,
      title: 'Red Day',
      eventColor: 'red',
      id: '1'
    }
  });
  yellowDays: CalendarEvent[] = ['6/2/2025','6/8/2025','3/18/2025','6/21/2025','5/7/2025','5/2/2025','7/7/2025','3/21/2025'].map(d=>{
    return {
      eventDate: d,
      title: 'Yellow Day',
      eventColor: 'yellow',
      id: '1'
    }
  });
  orangeDays: CalendarEvent[] = ['6/1/2025','6/8/2025','6/19/2025','5/25/2025','3/30/2025','3/22/2025','7/2/2025','7/19/2025'].map(d=>{
    return {
      eventDate: d,
      title: 'Orange Day',
      eventColor: 'orange',
      id: '1'
    }
  });
  
  updateValueBarPositiveHeight(value: number) {
    console.log(value);
    this.valueBarPositiveHeight = value;
    this.valueBarNegativeHeight = 100 - value;
    console.log(this.valueBarPositiveHeight, this.valueBarNegativeHeight);
  }
}
