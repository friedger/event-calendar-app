if (typeof window !== 'undefined') {
    var configToUse = window.NODE_ENV;
} else {
    var configToUse = process.env.NODE_ENV;
}

const config = {
    development: {
        apiUrl: 'http://localhost:3434',
        calendarBuildUrl: 'http://localhost:3434/calendar-build'
    },
    production: {
        apiUrl: 'http://localhost:3434',
        calendarBuildUrl: 'http://localhost:3434/calendar-build'
    }
}

module.exports = config[configToUse];
