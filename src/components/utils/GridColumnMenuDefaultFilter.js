import React from "react"
import { GridColumnMenuFilter } from '@progress/kendo-react-grid';

function GridColumnMenuDefaultFilter(props) {
    return (
        <div>
            <GridColumnMenuFilter {...props} expanded={true}/>
        </div>
    );
}
export default GridColumnMenuDefaultFilter;