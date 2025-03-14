import { Component, OnInit } from '@angular/core';
import { RevniqueCalendarComponent } from '../revnique-calendar/revnique-calendar.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { faCaretUp, faCaretDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { CalendarEvent, PortfolioState } from '../../store/portfolio-store/portfolio.state';
import { PortfolioActions, selectPortfolioState } from '../../store/portfolio-store/portfolio.actions';

@Component({
  selector: 'app-events-calendar',
  imports: [RevniqueCalendarComponent, CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './events-calendar.component.html',
  styleUrl: './events-calendar.component.scss'
})
export class EventsCalendarComponent implements OnInit{
  constructor(private store: Store<{ portfolio: PortfolioState }>) {}

  portfolioState$ = this.store.select(selectPortfolioState);
  showSummary = false;
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
  faTrash = faTrash;
  eventForm = new FormGroup({
    title: new FormControl(''),
    eventDate: new FormControl(''),
    eventColor: new FormControl('red')
  });
  eventColor = ['red', 'orange', 'yellow'];

  ngOnInit(){
    this.store.dispatch(PortfolioActions.loadCalendarEvents());
  }

  save(){
    console.log("asdf",this.eventForm.get('eventDate')?.value!);
    this.store.dispatch(PortfolioActions.addCalendarEvent({
      event: {
        id: '',
        title: this.eventForm.get('title')?.value!,
        eventDate: this.eventForm.get('eventDate')?.value!,
        eventColor: this.eventForm.get('eventColor')?.value!
      }
    }));
    this.resetEventForm();
  }

  deleteEvent(selectedEvent: CalendarEvent){
    console.log("deleteEvent", selectedEvent.id);
    this.store.dispatch(PortfolioActions.deleteCalendarEvent({
      id: selectedEvent.id
    }));
  }
  
  resetEventForm(){
    this.eventForm.reset();
  }

  toggleSummary(){
    this.showSummary = !this.showSummary;
  }
}
