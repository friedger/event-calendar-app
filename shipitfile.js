var path = require('path');

module.exports = function (shipit) {
    require('shipit-deploy')(shipit);

    shipit.initConfig({
        default: {
            workspace: '/tmp/eventcal-admin',
            deployTo: '/home/eventcal-admin',
            repositoryUrl: 'https://github.com/pezza3434/event-calendar-app.git',
            ignores: ['.git'],
            keepReleases: 5,
            deleteOnRollback: false,
            shallowClone: true
        },
        production: {
            servers: 'root@horu.io'
        }
    });
    shipit.on('updated', function () {
        var buildDirectory = path.resolve('./public/build/');
        shipit.remoteCopy(buildDirectory, shipit.releasePath);
    });
    shipit.on('published', function () {
          shipit.remote('cd ' + shipit.releasePath + ' && npm install --production').then(function(){
              shipit.remote('pm2 restart eventcal-admin');
          });
    });
};
