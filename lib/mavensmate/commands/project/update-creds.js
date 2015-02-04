/* update-creds commander component
 * To use add require('../cmds/update-creds.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';


var util        = require('../../util').instance;
var inherits    = require('inherits');
var BaseCommand = require('../../command');

function Command() {
  Command.super_.call(this, Array.prototype.slice.call(arguments, 0));
}

inherits(Command, BaseCommand);

Command.prototype.execute = function() {
  var self = this;
  
  var project = self.getProject();
  project.updateCreds(self.payload)
    .then(function() {
      self.respond('Credentials updated successfully!');
    })
    .catch(function(error) {
      self.respond('Could not update credentials', false, error);
    })
    .done();
};

exports.command = Command;
exports.addSubCommand = function(client) {
  client.program
    .command('update-creds')
    .description('Update project\'s salesfore.com credentials')
    .action(function(/* Args here */){
      var self = this;
      util.getPayload()
        .then(function(payload) {
          client.executeCommand(self._name, payload); 
        });
    });
};