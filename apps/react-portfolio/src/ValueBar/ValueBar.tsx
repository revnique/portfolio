import './ValueBar.scss';
export default function ValueBar({ valueBarPositiveHeight, isHorizontal, length, thickness }: { valueBarPositiveHeight: number, isHorizontal: boolean, length: number, thickness: number }) {
    const valueBarNegativeHeight = 100 - valueBarPositiveHeight;
    return (
        <>
            {isHorizontal ? (
                <div className="value-bar-container-wrapper-horizontal">
                    <div className="value-bar-container" style={{ width: `${length}px`, height: `${thickness}px` }}>
                        <div className="value-bar-positive" style={{ width: `${valueBarPositiveHeight}%` }}></div>
                        <div className="value-bar-negative" style={{ width: `${valueBarNegativeHeight}%` }}></div>
                    </div>
                    <div className="value-bar-label">
                        <span>{valueBarPositiveHeight}</span>
                    </div>
                </div>
            ) : (
                <div className="value-bar-container-wrapper">
                    <div className="value-bar-container" style={{ height: `${length}px`, width: `${thickness}px` }}>
                        <div className="value-bar-negative" style={{ height: `${valueBarNegativeHeight}%` }}></div>
                        <div className="value-bar-positive" style={{ height: `${valueBarPositiveHeight}%` }}></div>
                    </div>
                    <div className="value-bar-label">
                        <span>{valueBarPositiveHeight}</span>
                    </div>
                </div>
            )}
        </>
    )
}