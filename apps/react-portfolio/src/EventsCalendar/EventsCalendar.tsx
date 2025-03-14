import './EventsCalendar.scss';
import { useSelector, useDispatch } from 'react-redux';
import { CalendarEvent, PortfolioState } from '../store/PortfolioStore/portfolio.state';
import { faCaretUp, faCaretDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import RevniqueCalendar from '../RevniqueCalendar/RevniqueCalendar';
import { loadCalendarEvents } from '../store/PortfolioStore/portfolio.actions';
export const EventsCalendar = () => {
    const state = useSelector((state:any) => state.portfolioReducer as PortfolioState);
    const [showSummary, setShowSummary] = useState(false);
    const dispatch = useDispatch();
    const toggleSummary = () => {
        setShowSummary(!showSummary);
    }
    const deleteEvent = (event: CalendarEvent) => {
        console.log('deleteEvent', event);
    }
    const saveEvent = () => {
        console.log('saveEvent');
    }
    useEffect(() => {
        dispatch(loadCalendarEvents());
    }, []);
    return (
        <>
            <div className="main-content-header">
                <div className="summary">
                    <h1>Events Calendar</h1>
                    <div className="summary-subheader">(add events to calendar) <span className="summary-subheader-link" onClick={toggleSummary}><FontAwesomeIcon icon={showSummary ? faCaretUp : faCaretDown} /></span></div>
                    <div className={`summary-text ${showSummary ? 'show' : 'hide'}`}>
                        This page allows you to add events to the calendar. You can add events by clicking the "Add Event" button.
                    </div>
                </div>
            </div>
            <div className="main-content-body events-calendar">
                <div className="calendar-content-container">
                    <div className="main-calendar-container">
                        <h1>Calendar</h1>
                        {state.isPending && (
                            <div className="skeleton-loader-container">
                                <div className="skeleton-loader-base"></div>
                                <div className="skeleton-loader-indicator"></div>
                            </div>
                        )}
                        {!state.isPending && (
                            <RevniqueCalendar redDays={state.redDays} orangeDays={state.orangeDays} yellowDays={state.yellowDays} />
                        )}
                        {state.selectedCalendarEvent && state.selectedCalendarEvent.id && (
                            <div className="selected-event-container">
                                <div className="selected-event-container-content">
                                    <div className={`event-color-square ${state.selectedCalendarEvent.eventColor === 'red' ? 'red-day' : state.selectedCalendarEvent.eventColor === 'orange' ? 'orange-day' : 'yellow-day'}`}>&nbsp;&nbsp;&nbsp;</div>
                                    <div>
                                        <span className="event-color-text">{state.selectedCalendarEvent.title}</span>
                                    </div>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faTrash} className="delete-icon" onClick={() => deleteEvent(state.selectedCalendarEvent)} />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="event-form-container">
                        <h1>Add Event</h1>
                        <form className="form-container">
                            <div className="form-group">
                                <label htmlFor="title">Event Name</label>
                                <input type="text" className="form-field" name="title" maxLength={50} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="eventDate">Date</label>
                                <input type="date" className="form-field" name="eventDate" />
                            </div>
                            <div className="event-color-radiocontainer">
                                <div className="event-color-container">
                                    <input type="radio" name="eventColor" id="red" value="red" />
                                    <label htmlFor="red">
                                        <span className="event-color-text">Red</span><span className="event-color-square red-day">&nbsp;&nbsp;&nbsp;</span>
                                    </label>
                                </div>
                                <div className="event-color-container">
                                    <input type="radio" name="eventColor" id="orange" value="orange" />
                                    <label htmlFor="orange">
                                        <span className="event-color-text">Orange</span><span className="event-color-square orange-day">&nbsp;&nbsp;&nbsp;</span>
                                    </label>
                                </div>
                                <div className="event-color-container">
                                    <input type="radio" name="eventColor" id="yellow" value="yellow" />
                                    <label htmlFor="yellow">
                                        <span className="event-color-text">Yellow</span><span className="event-color-square yellow-day">&nbsp;&nbsp;&nbsp;</span>
                                    </label>
                                </div>
                            </div>
                            <div className="button-container">
                                <button type="button" onClick={saveEvent}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}