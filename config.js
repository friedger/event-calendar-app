if (typeof window !== 'undefined') {
    var configToUse = window.NODE_ENV;
} else {
    var configToUse = process.env.NODE_ENV;
}

const config = {
    secureDev: {
        apiUrl: 'https://eventcalendarapp.hopto.org:3434',
        calendarBuildUrl: 'https://eventcalendarapp.hopto.org:3434/calendar-build',
        stripePublishableToken: 'pk_test_cYLFCC3SbZhSHnpTZgzqHZZ9'
    },
    development: {
        apiUrl: 'http://localhost:3434',
        calendarBuildUrl: 'http://localhost:3434/calendar-build',
        stripePublishableToken: 'pk_test_cYLFCC3SbZhSHnpTZgzqHZZ9',
        intercom: false
    },
    production: {
        apiUrl: 'https://api.eventcalendarapp.com',
        calendarBuildUrl: 'https://api.eventcalendarapp.com/calendar-build',
        stripePublishableToken: 'pk_live_yoi7sUywpIFZoqyz9xu7d3Oq',
        intercom:true
    }
}

module.exports = config[configToUse];
