/* Loading the 'storj-backups.json' config file. Create the file if it doesn't exist. */

const fs = require('fs');
const log = require('loglevel');
let json;

try {
  // Loading the 'storj-backups.json' file.
  let file = fs.readFileSync('storj-backups.json');
  json = JSON.parse(file);
  log.info("Loading storj-backups.json...   ", + json != null ? "OK" : "ERR");
} catch(e) {
  log.error(e.message);
  process.exit(1);
}

// Loading environment variables.
// const env = require('dotenv').config();
// console.info("Loading environment variables... ", + env != null ? "OK" : "ERR");

function getConfig() {
  return json;
}

module.exports = {
  getConfig
};
