export default function addScriptToPage(userId) {
    window.eventCalId = userId;

    var mainScript = document.createElement('script');
    mainScript.setAttribute('src','http://localhost:3000/calendar-build/main.js');
    document.head.appendChild(mainScript);

    var stylesheet = document.createElement('link');
    stylesheet.setAttribute('href','http://localhost:3000/calendar-build/styles.css');
    stylesheet.setAttribute('rel','stylesheet');
    document.head.appendChild(stylesheet);

    var fontAwesome = document.createElement('link');
    fontAwesome.setAttribute('href','https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
    fontAwesome.setAttribute('rel','stylesheet');
    document.head.appendChild(fontAwesome);
}
