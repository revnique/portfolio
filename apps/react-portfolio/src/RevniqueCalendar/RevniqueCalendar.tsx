import React from 'react';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RevniqueCalendar.scss";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Day } from "./day.interface";
import './date';
import { useEffect, useState } from "react";
import { CalendarEvent } from "../store/PortfolioStore/portfolio.state";
import { useDispatch } from 'react-redux';
import { selectCalendarEvent } from '../store/PortfolioStore/portfolio.actions';
interface RevniqueCalendarProps {
    redDays: CalendarEvent[];
    yellowDays: CalendarEvent[];
    orangeDays: CalendarEvent[];
}

const RevniqueCalendar: React.FC<RevniqueCalendarProps> = ({ redDays, yellowDays, orangeDays }) => {
    const dispatch = useDispatch();
    const calInfo = {
        showTopRow: true,
        showBottomRow: true,
        currentDate: new Date(),
        currentJSMonthNumber: 0,
        currentMonthName: '',
        currentMonthDays: -1,
        currentYear: 0,
        prevMonthDays: 0,
        currentMonthFirstDayOfWeek: -1,
        currentMonthFirstDayOfWeekName: '',
        dayList: [] as Day[],
    }
    const [calInfoState, setCalInfoState] = useState(calInfo);
    const daysInMonth = (year: number, month: number) => new Date(year, month, 0).getDate();
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];


    const generateCalendar = (d: Date) => {
        calInfo.currentDate = d;
        console.log("generateCalendar", d);
        calInfo.currentJSMonthNumber = d.getMonth();
        calInfo.currentMonthName = d.getMonthName();

        calInfo.currentYear = d.getFullYear();
        calInfo.currentMonthDays = daysInMonth(calInfo.currentYear, calInfo.currentJSMonthNumber + 1);
        const prevMonth = new Date(calInfo.currentDate);
        prevMonth.setMonth(calInfo.currentJSMonthNumber - 1);
        calInfo.prevMonthDays = daysInMonth(prevMonth.getFullYear(), prevMonth.getMonth() + 1);

        const nextMonth = new Date(calInfo.currentDate);
        nextMonth.setMonth(calInfo.currentJSMonthNumber + 1);

        const firstDate = new Date(calInfo.currentYear, calInfo.currentJSMonthNumber, 1);
        calInfo.currentMonthFirstDayOfWeek = firstDate.getDay();
        calInfo.currentMonthFirstDayOfWeekName = daysOfWeek[calInfo.currentMonthFirstDayOfWeek];

        const total = 42;
        var paddingDays = 0;
        var paddingDayNumbers = 0;
        if (calInfo.currentMonthFirstDayOfWeek !== 0) {
            paddingDays = calInfo.currentMonthFirstDayOfWeek;
            paddingDayNumbers = (calInfo.prevMonthDays - paddingDays + 1);
        }

        var paddingDayCount = paddingDays;
        var paddingDayNumber = paddingDayNumbers;
        console.log('calInfo', calInfo);
        setCalInfoState({...calInfo});

        let todayDt = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;
        console.log("todayDt", todayDt);
        for (let index = 1; index <= total; index++) {
            let dayNumber = index;
            let isPaddingDay = false;
            let dt = `${prevMonth.getMonth() + 1}/${dayNumber}/${calInfo.currentYear}`;
            if (paddingDayCount > 0) {
                dayNumber = paddingDayNumber;
                isPaddingDay = true;
                dt = `${prevMonth.getMonth() + 1}/${paddingDayNumber}/${prevMonth.getFullYear()}`;
            } else {
                if (index > (paddingDays + calInfo.currentMonthDays)) {
                    dayNumber = index - (paddingDays + calInfo.currentMonthDays);
                    isPaddingDay = true;
                    dt = `${nextMonth.getMonth() + 1}/${dayNumber}/${nextMonth.getFullYear()}`;
                } else {
                    dayNumber = index - paddingDays;
                    isPaddingDay = false;
                    dt = `${calInfo.currentJSMonthNumber + 1}/${dayNumber}/${calInfo.currentYear}`;
                }
            }
            let day: Day = {
                uId: index,
                dayNumber: dayNumber,
                isPaddingDay: isPaddingDay,
                dt: dt,
                fullDt: new Date(dt).toUTCString(),
                showOrange: false,
                showYellow: false,
                showRed: false,
                isToday: todayDt === dt,
                calendarEvent: undefined
            }
            calInfo.dayList.push(day);
            paddingDayCount -= 1;
            paddingDayNumber += 1;
        }
        calInfo.dayList.forEach((dt) => {
            if (!dt.isPaddingDay) {
                dt.calendarEvent = orangeDays.find((d)=>d.eventDate === dt.dt) || yellowDays.find((d)=>d.eventDate === dt.dt) || redDays.find((d)=>d.eventDate === dt.dt);
                dt.showOrange = orangeDays.some((d)=>d.eventDate === dt.dt);
                dt.showYellow = yellowDays.some((d)=>d.eventDate === dt.dt);
                dt.showRed = redDays.some((d)=>d.eventDate === dt.dt);
            }
        })
        setCalInfoState({...calInfo}); 
    }

    const prevMonth = () => {
        const d = calInfoState.currentDate;
        d.setMonth(calInfoState.currentJSMonthNumber - 1);
        generateCalendar(d);
    }
    const nextMonth = () => {
        const d = calInfoState.currentDate;
        let newMonth = 0;
        if (calInfoState.currentJSMonthNumber === 11) {
            newMonth = 0;
            d.setFullYear(calInfoState.currentYear + 1);
        } else {
            newMonth = calInfoState.currentJSMonthNumber + 1;
        }
        d.setMonth(newMonth);
        generateCalendar(d);
    }

    const selectDay = (day: Day) => {
    if(day.calendarEvent){ 
        dispatch(selectCalendarEvent(day.calendarEvent!));
      } else {
        dispatch(selectCalendarEvent({} as CalendarEvent));
      }
    }

    useEffect(() => {
        generateCalendar(new Date());
    }, []);

    return (<div className="revnique-calendar">
        <div className="control-section">
            <div className="clickable fa-icon align-right" onClick={prevMonth}><FontAwesomeIcon icon={faChevronLeft} /></div>
            <div className="month-year-container"><span className="month-name">{calInfoState.currentMonthName}</span><span className="year-name">{calInfoState.currentYear}</span></div>
            <div className="clickable fa-icon" onClick={nextMonth}><FontAwesomeIcon icon={faChevronRight} /></div>
        </div>
        <div className="calendar-section">
            <div className="days-of-week-row">
                <div className="calendar-cell">Sun</div>
                <div className="calendar-cell">Mon</div>
                <div className="calendar-cell">Tue</div>
                <div className="calendar-cell">Wed</div>
                <div className="calendar-cell">Thu</div>
                <div className="calendar-cell">Fri</div>
                <div className="calendar-cell">Sat</div>
            </div>
            <div className="calendar-days">
                {calInfoState.dayList.map((day, index) => (
                    <div onClick={() => selectDay(day)} className={`calendar-cell ${day.isPaddingDay ? 'padding-day' : ''}`} key={index}
                        aria-label={day.fullDt} data-date={day.dt}>
                        <span className={`day-number ${day.showRed ? 'red-day' : ''} ${day.isToday ? 'today-day' : ''} ${day.showOrange ? 'orange-day' : ''} ${day.showYellow ? 'yellow-day' : ''}`}>
                            {day.dayNumber < 10 ? (<><span className="hidden">0</span>{day.dayNumber}</>) : day.dayNumber}
                        </span>
                    </div>
                ))}
            </div>
        </div>
        <div className="legend-section">
            <div className="legend-cell">
                <div className="legend-color today-day">&nbsp;</div>
                <div className="legend-label">Today</div>
            </div>
            <div className="legend-cell">
                <div className="legend-color red-day">&nbsp;</div>
                <div className="legend-label">Red</div>
            </div>
            <div className="legend-cell">
                <div className="legend-color orange-day">&nbsp;</div>
                <div className="legend-label">Orange</div>
            </div>
            <div className="legend-cell">
                <div className="legend-color yellow-day">&nbsp;</div>
                <div className="legend-label">Yellow</div>
            </div>
        </div>
    </div>);
}

export default RevniqueCalendar;