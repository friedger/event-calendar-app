import React from 'react';
import escapeCSS from '../../../utils/escapeCSS';

export default props => {
    return (
        <style>
            {`
                #event-calendar-app .calendar-list-view .calendar-list-event.uuid-${escapeCSS(
                    props.uuid
                )}{
                    border: 3px solid #da4167 !important;
                    border-bottom: 3px solid #da4167 !important;
                }
                #event-calendar-app .calendar-list-event.uuid-${escapeCSS(
                    props.uuid
                )}:after{
                    display: block !important;
                }
                `}
            </style>
    );
};
