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
            shallowClone: true,
            branch: 'master'
        },
        production: {
            servers: 'root@eventcalendarapp.com'
        }
    });
    shipit.on('updated', function () {
        var buildDirectory = path.resolve('./server/public/build/');
        shipit.remoteCopy(buildDirectory, path.join(shipit.releasePath, 'server/public'));
    });
    shipit.on('published', function () {
          shipit.remote('cd ' + shipit.releasePath + ' && npm install --production').then(function(){
              shipit.remote('pm2 restart eventcal-admin');
          });
    });
};
