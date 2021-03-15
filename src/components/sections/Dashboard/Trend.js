import React from 'react';

import {
    XYPlot,
    AreaSeries,
    makeWidthFlexible
} from 'react-vis';

const Flexible = makeWidthFlexible(XYPlot)

export default function Trends(props) {
    const color = props?.color || "#31BDF4";
    return (
        <Flexible height={props.height || 150}>
            <AreaSeries
                style={{ strokeWidth: "3", }}
                stroke={color}
                className="area-series-example"
                curve="curveNatural"
                fill={color}
                data={props?.data || []}
            />
        </Flexible>
    );
}