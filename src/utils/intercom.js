function intercomDoesNotExist() {
    return !window.Intercom;
}

export default {
    update(userInfo) {
        if (intercomDoesNotExist()) {
            console.info('Failed to fire intercom update. Intercom does not exist');
        }

        // SetTimeout ensures it happens after any intercom events have been sent.
        setTimeout(() => {
            Intercom('update', Object.assign(userInfo, {randomNumberToCauseRefresh: Math.random()}));
        }, 3000);
    },
    trackEvent(eventName) {
        if (intercomDoesNotExist()) {
            console.info('Failed to fire intercom event. Intercom does not exist');
        }
        Intercom('trackEvent', eventName);
    }    
}
