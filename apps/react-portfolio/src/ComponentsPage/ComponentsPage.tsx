import { useState } from "react";
import './ComponentsPage.scss';
import ValueBar from "../ValueBar/ValueBar";
import RevniqueCalendar from "../RevniqueCalendar/RevniqueCalendar";
export default function ComponentsPage() {
    const [valueBarPositiveHeight, setValueBarPositiveHeight] = useState(70);
    
    const updateValueBarPositiveHeight = (height: number) => {
        setValueBarPositiveHeight(height);
    }
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
                    <div className="section">
                        <h2>Calendar</h2>
                        <div className="calendar-container">
                            <RevniqueCalendar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}