exports.dialog = [{
  type: 'ModalAlert',
  options: {
    markdowns: [
      '## Welcome to the level builder!',
      '',
      'Here are the main steps:',
      '',
      '  * Set up the initial environment with git commands',
      '  * Define the starting tree with ```define start```',
      '  * Enter the series of git commands that compose the (optimal) solution',
      '  * Define the goal tree with ```define goal```. Defining the goal also defines the solution',
      '  * Optionally define a hint with ```define hint```',
      '  * Edit the name with ```define name```',
      '  * Optionally define a nice start dialog with ```edit dialog```',
      '  * Enter the command ```finish``` to output your level JSON!'
    ]
  }
}];
