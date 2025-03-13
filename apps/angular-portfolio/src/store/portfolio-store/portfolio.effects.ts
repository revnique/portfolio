import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { PortfolioActions } from './portfolio.actions';
import { PortfolioService } from '../../services/portfolio.service';
import { CalendarService } from '../../services/calendar.service';

@Injectable()
export class PortfolioEffects {
    constructor(
        private actions$: Actions,
        private portfolioService: PortfolioService,
        private calendarService: CalendarService
    ) { }

    loadBuckLites$ = createEffect(() => this.actions$.pipe(
        ofType(PortfolioActions.loadBuckLites),
        mergeMap(() => this.portfolioService.fetchBuckLites().then(buckLites => PortfolioActions.loadBuckLitesSuccess({ buckLites }))
        ))
    );

    loadBuckLite$ = createEffect(() => this.actions$.pipe(
        ofType(PortfolioActions.loadBuckLite),
        mergeMap((action) => this.portfolioService.fetchBuckLite(action.SN).then(buckLite => PortfolioActions.loadBuckLiteSuccess({ buckLite }))
        ))
    );

    loadCalendarEvents$ = createEffect(() => this.actions$.pipe(
        ofType(PortfolioActions.loadCalendarEvents),
        mergeMap(() => this.calendarService.fetchCalendarEvents().then(events => PortfolioActions.loadCalendarEventsSuccess({ events }))
        ))
    );

    addCalendarEvent$ = createEffect(() => this.actions$.pipe(
        ofType(PortfolioActions.addCalendarEvent),
        mergeMap((action) => this.calendarService.addCalendarEvent(action.event).then(() => PortfolioActions.addCalendarEventSuccess())
        ))
    );

    deleteCalendarEvent$ = createEffect(() => this.actions$.pipe(
        ofType(PortfolioActions.deleteCalendarEvent),
        mergeMap((action) => this.calendarService.deleteCalendarEvent(action.id, action.eventDate).then(() => PortfolioActions.deleteCalendarEventSuccess())
        ))
    );
}
