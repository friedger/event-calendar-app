if (typeof window !== 'undefined') {
    var configToUse = window.NODE_ENV;
} else {
    var configToUse = process.env.NODE_ENV;
}

const config = {
    secureDev: {
        apiUrl: 'https://eventcalendarapp.hopto.org:3434',
        appUrl: 'https://eventcalendarapp.hopto.org:1212',
        calendarBuildUrl: 'https://eventcalendarapp.hopto.org:3434/calendar-build',
        stripePublishableToken: 'pk_test_cYLFCC3SbZhSHnpTZgzqHZZ9'
    },
    development: {
        apiUrl: 'http://dev.eventcalendarapp.com:3434',
        appUrl: 'http://dev.eventcalendarapp.com:1212',
        calendarBuildUrl: 'http://dev.eventcalendarapp.com:3434/calendar-build',
        stripePublishableToken: 'pk_test_cYLFCC3SbZhSHnpTZgzqHZZ9',
        intercom: 'u410pmry'
    },
    production: {
        apiUrl: 'https://api.eventcalendarapp.com',
        appUrl: 'https://eventcalendarapp.com',
        calendarBuildUrl: 'https://api.eventcalendarapp.com/calendar-build',
        stripePublishableToken: 'pk_live_yoi7sUywpIFZoqyz9xu7d3Oq',
        intercom:'scigxdd1'
    }
}

module.exports = config[configToUse];
