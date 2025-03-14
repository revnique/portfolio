import { combineEpics, ofType, Epic } from 'redux-observable';
import { map } from 'rxjs';
import { ToggleSideBar, ToggleSideBarSuccess } from './root.actions';
import { loadBuckLitesEpic, loadBuckLiteEpic, loadCalendarEventsEpic, addCalendarEventEpic, deleteCalendarEventEpic } from './PortfolioStore/portfolio.epic';

type RootAction = { type: string; payload?: any };
type RootState = any;

export const toggleSideBarEpic: Epic<RootAction, RootAction, RootState> = (action$) => action$.pipe(
    ofType(ToggleSideBar),
    map(() => ({ type: ToggleSideBarSuccess, payload: {} }))
);

export const rootEpic = combineEpics<RootAction, RootAction, RootState>(
    toggleSideBarEpic,
    loadBuckLitesEpic,
    loadBuckLiteEpic,
    loadCalendarEventsEpic,
    addCalendarEventEpic,
    deleteCalendarEventEpic
);
  