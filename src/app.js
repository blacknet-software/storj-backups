const { Command } = require('commander');


const cli = new Command()
  .name('storj-backups')
  .description('File backups on storj network')
  .version('0.1.0');

/* Loading the commands */
require('./commands/create').initialize(cli);

/* Parse and ready to use */
cli.parse();
