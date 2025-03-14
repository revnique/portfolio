import { ofType } from 'redux-observable';
import { Observable, mergeMap } from 'rxjs';
import { fetchBuckLite, fetchBuckLites } from '../../services/PortfolioService';
import { LoadBuckLitesSuccess, LoadBuckLites, LoadBuckLiteSuccess, LoadBuckLite, AddCalendarEventSuccess, AddCalendarEvent, DeleteCalendarEventSuccess, DeleteCalendarEvent, LoadCalendarEventsSuccess, LoadCalendarEvents } from './portfolio.actions';
import { fetchCalendarEvents, addCalendarEvent, deleteCalendarEvent } from '../../services/CalendarService';

export const loadBuckLitesEpic = (action$: Observable<any>) => action$.pipe(
    ofType(LoadBuckLites),
        mergeMap(async () => {
        const result = await fetchBuckLites();
        return { type: LoadBuckLitesSuccess, payload: result };
    })
);

export const loadBuckLiteEpic = (action$: Observable<any>) => action$.pipe(
    ofType(LoadBuckLite),
    mergeMap(async (action) => {
        const result = await fetchBuckLite(action.payload);
        return { type: LoadBuckLiteSuccess, payload: result };
    })
);

export const addCalendarEventEpic = (action$: Observable<any>) => action$.pipe(
    ofType(AddCalendarEvent),
    mergeMap(async (action) => {
        const result = await addCalendarEvent(action.payload);
        return { type: AddCalendarEventSuccess, payload: result };
    })
);

export const deleteCalendarEventEpic = (action$: Observable<any>) => action$.pipe(
    ofType(DeleteCalendarEvent),
    mergeMap(async (action) => {
        const result = await deleteCalendarEvent(action.payload.id);
        return { type: DeleteCalendarEventSuccess, payload: result };
    })
);

export const loadCalendarEventsEpic = (action$: Observable<any>) => action$.pipe(
    ofType(LoadCalendarEvents),
    mergeMap(async () => {
        const result = await fetchCalendarEvents();
        return { type: LoadCalendarEventsSuccess, payload: result };
    })
);

