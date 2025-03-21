import { useState } from "react";
import './ComponentsPage.scss';
import ValueBar from "../ValueBar/ValueBar";
import RevniqueCalendar from "../RevniqueCalendar/RevniqueCalendar";
import { CalendarEvent } from "../store/PortfolioStore/portfolio.state";

export default function ComponentsPage() {
    const [valueBarPositiveHeight, setValueBarPositiveHeight] = useState(70);
    
    const updateValueBarPositiveHeight = (height: number) => {
        setValueBarPositiveHeight(height);
    }

    const redDays: CalendarEvent[] = ['3/3/2025', '3/7/2025', '6/28/2025', '6/29/2025', '5/17/2025', '5/28/2025', '7/27/2025', '7/11/2025'].map(d => {
        return {
            eventDate: d,
            title: 'Red Day',
            eventColor: 'red',
            id: '1'
        }
    });
    const yellowDays: CalendarEvent[] = ['6/2/2025', '6/8/2025', '3/18/2025', '6/21/2025', '5/7/2025', '5/2/2025', '7/7/2025', '3/21/2025'].map(d => {
        return {
            eventDate: d,
            title: 'Yellow Day',
            eventColor: 'yellow',
            id: '1'
        }
    });
    const orangeDays: CalendarEvent[] = ['6/1/2025', '6/8/2025', '6/19/2025', '5/25/2025', '3/30/2025', '3/22/2025', '7/2/2025', '7/19/2025'].map(d => {
        return {
            eventDate: d,
            title: 'Orange Day',
            eventColor: 'orange',
            id: '1'
        }
    });

    return (
        <>
            <div className="main-content-header">
                <div className="summary">
                    <h1>ComponentsPage</h1>
                    <p>ComponentsPage is a page that contains components.</p>
                </div>
            </div>
            <div className="main-content-body">
                <div className="content-container">
                    <div className="section">
                        <h2>Slider /w Bar</h2>
                        <div className="slider-container">
                            <form>
                                <div className="form-group">
                                    <div className="slider-form-group">
                                        <label htmlFor="value0" onClick={() => updateValueBarPositiveHeight(0)}>0</label>
                                        <input type="range" id="value0" min="0" max="100" value={valueBarPositiveHeight} onChange={(e) => updateValueBarPositiveHeight(+e.target.value)} />
                                        <label htmlFor="value100" onClick={() => updateValueBarPositiveHeight(100)}>100</label>
                                    </div>
                                </div>
                            </form>
                            <div className="slider-value-bar-container">
                                <div className="vertical">
                                    <ValueBar valueBarPositiveHeight={valueBarPositiveHeight} isHorizontal={false} length={150} thickness={50} />
                                </div>
                                <div className="horizontal">
                                    <ValueBar valueBarPositiveHeight={valueBarPositiveHeight} isHorizontal={true} length={150} thickness={50} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section calendar-section">
                        <h2>Calendar</h2>
                        <div className="calendar-container">
                            <RevniqueCalendar redDays={redDays} yellowDays={yellowDays} orangeDays={orangeDays} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}