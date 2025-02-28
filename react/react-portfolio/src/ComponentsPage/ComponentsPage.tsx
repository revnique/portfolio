import { useState } from "react";
import './ComponentsPage.scss';

export default function ComponentsPage() {
    const [valueBarNegativeHeight, setValueBarNegativeHeight] = useState(30);
    const [valueBarPositiveHeight, setValueBarPositiveHeight] = useState(70);
    
    const updateValueBarPositiveHeight = (height: number) => {
        setValueBarPositiveHeight(height);
        setValueBarNegativeHeight(100 - height);
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
                                <div className="value-bar-container-wrapper">
                                    <div className="value-bar-container">
                                        <div className="value-bar-negative" style={{ height: `${valueBarNegativeHeight}%` }}></div>
                                        <div className="value-bar-positive" style={{ height: `${valueBarPositiveHeight}%` }}></div>
                                    </div>
                                    <div className="value-bar-label">
                                        <span>{valueBarPositiveHeight}</span>
                                    </div>
                                </div>

                                <div className="value-bar-container-wrapper-horizontal">
                                    <div className="value-bar-container">
                                        <div className="value-bar-positive" style={{ width: `${valueBarPositiveHeight}%` }}></div>
                                        <div className="value-bar-negative" style={{ width: `${valueBarNegativeHeight}%` }}></div>
                                    </div>
                                    <div className="value-bar-label">
                                        <span>{valueBarPositiveHeight}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}