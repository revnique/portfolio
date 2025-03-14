import { PortfolioActions } from "./portfolio.actions";
import { initialPortfolioState } from "./portfolio.state";
import { createReducer, on } from "@ngrx/store";
import { BuckLite, getMatches } from "../../app/buck-lite/buck-helper";
export const portfolioReducer = createReducer(
    initialPortfolioState,
    on(PortfolioActions.loadBuckLites, (state) => ({
        ...state,
        isPending: true
    })),
    on(PortfolioActions.loadBuckLite, (state) => ({
        ...state,
        isPending: true
    })),
    on(PortfolioActions.loadBuckLitesSuccess, (state, action) => {
        let buckLites = JSON.parse(JSON.stringify(action.buckLites));
        buckLites.forEach((buckLite: BuckLite) => {
            buckLite.match = getMatches(buckLite.SN);
        });
        return {
            ...state,
            BuckLites: buckLites,
            isPending: false
        }
    }),
    on(PortfolioActions.loadBuckLiteSuccess, (state, action) => {
        console.log('loadBuckLiteSuccess', action, state);
        let buckLite = JSON.parse(JSON.stringify(action.buckLite));
        if (buckLite) {
            buckLite.match = getMatches(buckLite.SN);
        }

        return {
            ...state,
            BuckLite: buckLite,
            isPending: false
        }
    }),
    on(PortfolioActions.setIsPending, (state, action) => ({
        ...state,
        isPending: action.isPending
    })),
    on(PortfolioActions.loadCalendarEvents, (state, action) => ({
        ...state,
        isPending: true
    })),
    on(PortfolioActions.loadCalendarEventsSuccess, (state, action) => {
        console.log("loadCalendarEventsSuccess", action.events);
        let redDays = action.events.filter(event => event.eventColor === 'red').map(event => {
            const evt = JSON.parse(JSON.stringify(event));
            const dt = new Date(evt.eventDate);
            const eventDate = `${dt.getMonth() + 1}/${dt.getDate()+1}/${dt.getFullYear()}`;
            evt.eventDate = eventDate;
            return evt;
        });
        let orangeDays = action.events.filter(event => event.eventColor === 'orange').map(event => {
            const evt = JSON.parse(JSON.stringify(event));
            const dt = new Date(evt.eventDate);
            const eventDate = `${dt.getMonth() + 1}/${dt.getDate()+1}/${dt.getFullYear()}`;
            evt.eventDate = eventDate;
            return evt;
        });
        let yellowDays = action.events.filter(event => event.eventColor === 'yellow').map(event => {
            const evt = JSON.parse(JSON.stringify(event));
            const dt = new Date(evt.eventDate);
            const eventDate = `${dt.getMonth() + 1}/${dt.getDate()+1}/${dt.getFullYear()}`;
            evt.eventDate = eventDate;
            return evt;
        });
        return {
            ...state,
            CalendarEvents: action.events,
            redDays: redDays,
            orangeDays: orangeDays,
            yellowDays: yellowDays,
            isPending: false
        }
    }),
    on(PortfolioActions.selectCalendarEvent, (state, action) => ({
        ...state,
        selectedCalendarEvent: action.event!
    })),
    on(PortfolioActions.deleteCalendarEvent, (state) => ({
        ...state,
        isPending: true,
        selectedCalendarEvent: {
            id: '',
            title: '',
            eventDate: '',
            eventColor: ''
        }
    })),
    on(PortfolioActions.deleteCalendarEventSuccess, (state) => ({
        ...state,
        isPending: false
    })),
    on(PortfolioActions.addCalendarEvent, (state) => ({
        ...state,
        isPending: true,
    })),
    on(PortfolioActions.addCalendarEventSuccess, (state) => ({
        ...state,
        isPending: false,
        selectedCalendarEvent: {
            id: '',
            title: '',
            eventDate: '',
            eventColor: ''
        }
    }))
);

export default portfolioReducer;