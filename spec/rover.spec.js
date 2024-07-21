const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  // Test 7
  test("constructor sets position and default values for mode and generatorWatts", function() {
    let testObject = new Rover('position', 'NORMAL', 110);
    expect(testObject.position).toBe('position');
    expect(testObject.mode).toBe('NORMAL');
    expect(testObject.generatorWatts).toBe(110);
  });

  //Test 8
  test("response returned by receiveMessage contains the name of the message", function() {
    let message = new Message('Test message with two commands');
    let rover = new Rover();
    let response = rover.receiveMessage(message);
    expect(response.message).toBe(message.name);
  });

  //Test 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let testRover = new Rover();
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message('Test message with two commands', commands);
    let response = testRover.receiveMessage(message);
    expect(response.results.length).toBe(commands.length);
  });

  //Test 10
  test("responds correctly to the status check command", function() {
    let rover = new Rover(12345);
    let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(response.results[0].roverStatus.generatorWatts).toBe(110);
    expect(response.results[0].roverStatus.mode).toBe('NORMAL');
    expect(response.results[0].roverStatus.position).toBe(12345);
  });

  //Test 11
  test("responds correctly to the mode change command", function() {
    let rover = new Rover(12345);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[0].completed).toBe(true);
    expect(response.results[1].completed).toBe(true);
  });

  //Test 12
  test("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let rover = new Rover(12345);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 12345)];
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[1].completed).toBe(false);    
  });

  //Test 13
  test("responds with the position for the move command", function() {
    let rover = new Rover();
    let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 54321)];
    let message = new Message('Test message with two commands', commands);
    let response = rover.receiveMessage(message);
    expect(response.results[1].roverStatus.position).toBe(54321);
  });
});
