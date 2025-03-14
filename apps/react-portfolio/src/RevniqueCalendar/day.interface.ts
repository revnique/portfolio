import { CalendarEvent } from "../store/PortfolioStore/portfolio.state";

export interface Day {
    uId: number;
    dayNumber: number;
    isPaddingDay: boolean;
    dt: string;
    fullDt: string;
    showOrange: boolean;
    showYellow: boolean;
    showRed: boolean;
    isToday: boolean;
    calendarEvent?: CalendarEvent;
} 