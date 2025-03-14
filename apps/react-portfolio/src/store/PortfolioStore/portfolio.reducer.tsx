import { LoadBuckLites, LoadBuckLite, LoadBuckLitesSuccess, LoadBuckLiteSuccess, SetIsPending,
     SelectCalendarEvent, AddCalendarEvent, AddCalendarEventSuccess, DeleteCalendarEvent, DeleteCalendarEventSuccess, LoadCalendarEvents, LoadCalendarEventsSuccess } from "./portfolio.actions";
import { initialPortfolioState, CalendarEvent } from "./portfolio.state";
import { BuckLite } from "../../BuckLite/buck-helper";
import { getMatches } from "../../BuckLite/buck-helper";

const portfolioReducer = (state = initialPortfolioState, action:any) => {
    console.log('portfolio action', action);
    switch (action.type) {
        case LoadBuckLites:
            return {
                ...state,
                isPending: true
            };
        case LoadBuckLite:
            let buckLite = action.payload;
            buckLite.match = getMatches(buckLite.SN);
            return {
                ...state,
                isPending: true
            };
        case LoadBuckLitesSuccess:
            let buckLites = action.payload;
            buckLites.forEach((buckLite: BuckLite) => {
                buckLite.match = getMatches(buckLite.SN);
            }); 
            return {
                ...state,
                BuckLites: buckLites,
                isPending: false
            };
        case LoadBuckLiteSuccess:
            return {
                ...state,
                BuckLite: action.payload,
                isPending: false
            };
        case SetIsPending:
            return {
                ...state,
                isPending: action.payload
            };
        case SelectCalendarEvent:
            return {
                ...state,
                selectedCalendarEvent: action.payload
            };
        case AddCalendarEvent:
            return {
                ...state,
                isPending: true
            };
        case AddCalendarEventSuccess:
            return {
                ...state,
                isPending: false
            };
        case DeleteCalendarEvent:
            return {
                ...state,
                isPending: true
            };
        case DeleteCalendarEventSuccess:
            return {
                ...state,
                isPending: false
            };
        case LoadCalendarEvents:
            return {
                ...state,
                isPending: true
            };
        case LoadCalendarEventsSuccess:
            console.log('LoadCalendarEventsSuccess', action.events);
            let redDays = action.events.filter((event: CalendarEvent) => event.eventColor === 'red').map((event: CalendarEvent) => {
                const evt = JSON.parse(JSON.stringify(event));
                const dt = new Date(evt.eventDate);
                const eventDate = `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
                evt.eventDate = eventDate;
                return evt;
            });
            let orangeDays = action.events.filter((event: CalendarEvent) => event.eventColor === 'orange').map((event: CalendarEvent) => {
                const evt = JSON.parse(JSON.stringify(event));
                const dt = new Date(evt.eventDate);
                const eventDate = `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
                evt.eventDate = eventDate;
                return evt;
            });
            let yellowDays = action.events.filter((event: CalendarEvent) => event.eventColor === 'yellow').map((event: CalendarEvent) => {
                const evt = JSON.parse(JSON.stringify(event));
                const dt = new Date(evt.eventDate);
                const eventDate = `${dt.getMonth() + 1}/${dt.getDate()}/${dt.getFullYear()}`;
                evt.eventDate = eventDate;
                return evt;
            });
            return {
                ...state,
                redDays: redDays,
                orangeDays: orangeDays,
                yellowDays: yellowDays,
                isPending: false
            };
        default:
            return state;
    }
};

export default portfolioReducer;