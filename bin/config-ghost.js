'use strict';
const Cp = require('child_process');
const Consulite = require('consulite');
const consulHost = `${process.env.CONSUL_AGENT ? 'localhost' : process.env.CONSUL}:8500`;
const debug = require('debug')('config-ghost');
const isPreStart = process.argv[2] === 'preStart';
const isOnChange = process.argv[2] === 'onChange';

debug('running node script. preStart=%s, onChange=%s, env=%j',
  isPreStart, isOnChange, process.env);

if (!isPreStart && !isOnChange) {
  throw new Error('run in an unexpected mode');
}

lookupService((err, service) => {
  if (err) {
    throw err;
  }

  debug('service = %j', service);
  createGhostConfigFile(service);
});


function createGhostConfigFile (service) {
  const template = '/var/lib/ghost/config.production.json.ctmpl';
  const conf = '/var/lib/ghost/config.production.json';

  debug('creating config file (%s) from template (%s).', conf, template);

  const cmd = 'consul-template -once' +
              ` -consul-addr ${consulHost}` +
              ` -template "${template}:${conf}` +
              (isOnChange ? ':pkill -f current/index.js' : '') + '"';
  const env = Object.assign({}, process.env, {
    DB_HOST: service.address,
    DB_USER: process.env.MYSQL_USER,
    DB_PASSWORD: process.env.MYSQL_PASSWORD,
    DB_NAME: process.env.MYSQL_DATABASE
  });

  Cp.execSync(cmd, { env });
}


function lookupService (callback) {
  const consul = new Consulite({ consul: consulHost });

  debug('looking up service in consul (%s)', consulHost);
  consul.getService('mysql-primary', callback);
}
