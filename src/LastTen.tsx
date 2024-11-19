import React from "react";

export default function LastTen({lastTen}: {lastTen: string[]}) {
    return (
        <div className="lastTen">
            {lastTen.length > 0 && <ul>
                {lastTen.map((stateName) => <li key={stateName}>{stateName}</li>)}
                </ul>}
        </div>
    )
}