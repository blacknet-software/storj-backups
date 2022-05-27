const storj = require('../services/storj');


function initialize(cli) {
  cli.command('create')
    .description('Backup a folder or a file.')
    .argument('<string>', 'path to the file or folder.')
    .action((path, options) => {
      storj.uploadDir(path, "backups");
    });
}


module.exports = {
  initialize
};
