import './BuckLite.scss';
import { useState } from 'react';
export default function BuckLite() {
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
                    <h1>BuckLite</h1>
                    <p>BuckLite is a simple budgeting app that allows you to track your income and expenses.</p>
                </div>
            </div>
            <div className="main-content-body">
                <div className="content-container">
                    <h1>BuckLite content</h1>
                    <form>
                        <div className="form-group">
                            <div>
                                <label htmlFor="value0" onClick={() => updateValueBarPositiveHeight(0)}>0</label>
                                <input type="range" id="value0" min="0" max="100" value={valueBarPositiveHeight} onChange={(e) => updateValueBarPositiveHeight(+e.target.value)} />
                                <label htmlFor="value100" onClick={() => updateValueBarPositiveHeight(100)}>100</label>
                            </div>
                        </div>
                        
                    </form>
                    <div className="value-bar-container">
                        <div className="value-bar-negative" style={{ height: `${valueBarNegativeHeight}%` }}></div>
                        <div className="value-bar-positive" style={{ height: `${valueBarPositiveHeight}%` }}></div>
                    </div>
                </div>
            </div>
        </>
    )
}