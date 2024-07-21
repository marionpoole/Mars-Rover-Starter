const Command = require('./command.js');
const Message = require('./message.js');

class Rover {
   // Write code here!
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {

      let roverStatus = {
         mode: this.mode,
         generatorWatts: this.generatorWatts,
         position: this.position
      }

      let resultsArray = [];

      for (let i = 0; i < message.commands.length; i++) {
         let command = message.commands[i];
         let result = {}

         if (command.commandType == 'MODE_CHANGE' && command.value === 'NORMAL') {
            roverStatus.mode = 'NORMAL'
            result.completed = true;
         } else if (command.commandType === 'MODE_CHANGE' && command.value === 'LOW_POWER') {
            roverStatus.mode = 'LOW_POWER';
            result.completed = true;
         }

         if (roverStatus.mode === 'LOW_POWER' && command.commandType === 'MOVE') {
            result.completed = false;
         } else if (roverStatus.mode === 'NORMAL' && command.commandType === 'MOVE') {
            roverStatus.position = command.value;
            result.completed = true;
            result.roverStatus = roverStatus;
         }
      

         if (command.commandType === 'STATUS_CHECK') {
            result.completed = true;
            result.roverStatus = roverStatus;
         }

         resultsArray.push(result);
      }


      let response = {
         message: message.name,
         results: resultsArray
      }
      return response;
   }
}

let rover = new Rover(97835);
let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 54321)];
let message = new Message('Test message with two commands', commands);
let response = rover.receiveMessage(message);

console.log(response.results)

module.exports = Rover;