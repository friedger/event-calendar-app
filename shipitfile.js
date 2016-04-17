var path = require('path');

module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  shipit.initConfig({
    default: {
      workspace: '/tmp/eventcal-admin',
      deployTo: '/home/eventcal-admin',
      repositoryUrl: 'https://pezza3434@bitbucket.org/pezza3434/eventcal-admin.git',
      ignores: ['.git'],
      keepReleases: 5,
      deleteOnRollback: false,
      shallowClone: true
    },
    production: {
      servers: 'root@horu.io'
    }
  });
  shipit.on('published', function () {
      shipit.remote('cd ' + shipit.releasePath + ' && npm install && npm run build').then(function(){
        //   shipit.remote('pm2 restart horu');
      });
  });
};
