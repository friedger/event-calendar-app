export default function(detail) {

    var event;
    if (window.CustomEvent) {
        event = new CustomEvent('refreshCalendar', { detail: detail });
    } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent('refreshCalendar', true, true, { detail: detail });
    }

    document.dispatchEvent(event);
}
