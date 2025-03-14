import { createActionGroup, props } from '@ngrx/store';
import { BuckLite } from '../../app/buck-lite/buck-helper';
import { emptyProps } from '@ngrx/store';
import { createSelector } from '@ngrx/store';
import { CalendarEvent, PortfolioState } from './portfolio.state';

export const PortfolioActions = createActionGroup({
    source: 'Portfolio',
    events: {
        loadBuckLites: emptyProps(),
        loadBuckLitesSuccess: props<{ buckLites: BuckLite[] }>(),
        loadBuckLite: props<{ SN: string }>(),
        loadBuckLiteSuccess: props<{ buckLite: BuckLite }>(),
        setIsPending: props<{ isPending: boolean }>(),
        addCalendarEvent: props<{ event: CalendarEvent }>(),
        addCalendarEventSuccess: emptyProps(),
        deleteCalendarEvent: props<{ id: string }>(),
        deleteCalendarEventSuccess: emptyProps(),
        loadCalendarEvents: emptyProps(),
        loadCalendarEventsSuccess: props<{ events: CalendarEvent[] }>(),
        selectCalendarEvent: props<{ event: CalendarEvent | null }>(),
    },
});

export const selectPortfolioState = (state: { portfolio: PortfolioState }) => state.portfolio;

export const selectState = createSelector(
    selectPortfolioState,
    (state: PortfolioState) => state
);