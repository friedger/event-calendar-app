const config = require('../../config');

export default function addScriptToPage(userId, eventCalWidgetUuid) {
    window.eventCalId = userId;
    window.eventCalWidgetUuid = eventCalWidgetUuid;

    var mainScript = document.createElement('script');
    mainScript.setAttribute('src',`${config.calendarBuildUrl}/main.js`);
    document.head.appendChild(mainScript);

    var stylesheet = document.createElement('link');
    stylesheet.setAttribute('href',`${config.calendarBuildUrl}/styles.css`);
    stylesheet.setAttribute('rel','stylesheet');
    document.head.appendChild(stylesheet);

    var fontAwesome = document.createElement('link');
    fontAwesome.setAttribute('href','https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
    fontAwesome.setAttribute('rel','stylesheet');
    document.head.appendChild(fontAwesome);
}
