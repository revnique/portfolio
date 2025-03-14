import { BuckLite } from "../../BuckLite/buck-helper";


export const initialPortfolioState: PortfolioState = {
    isPending: true,
    BuckLites: [],
    BuckLite: {} as BuckLite,
    CalendarEvents: [],
    redDays: [],
    orangeDays: [],
    yellowDays: [],
    selectedCalendarEvent: {} as CalendarEvent
}

export interface PortfolioState {
    isPending: boolean;
    BuckLites: BuckLite[];
    BuckLite: BuckLite;
    CalendarEvents: CalendarEvent[];
    redDays: CalendarEvent[];
    orangeDays: CalendarEvent[];
    yellowDays: CalendarEvent[];
    selectedCalendarEvent: CalendarEvent;
}

export interface CalendarEvent {
    id?: string;
    title: string;
    eventDate: string;
    eventColor: string;
}
