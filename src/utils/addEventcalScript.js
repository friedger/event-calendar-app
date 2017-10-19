const config = require('../../config');

function isMyScriptLoaded(url) {
    var scripts = document.getElementsByTagName('script');
    for (var i = scripts.length; i--;) {
        if (scripts[i].src == url) return true;
    }
    return false;
}

export default function addScriptToPage(userId) {
    const scriptUrl = `${config.apiUrl}/integration-script.js`;
    if (!isMyScriptLoaded(scriptUrl) || window.eventCalId !== userId) {
        window.eventCalId = userId;
        var mainScript = document.createElement('script');
        mainScript.setAttribute('src',`${config.apiUrl}/integration-script.js`);
        document.head.appendChild(mainScript);
    }
}
