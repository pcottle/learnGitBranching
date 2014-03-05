# LearnGitBranching

LearnGitBranching is a git repository visualizer, sandbox, and series of educational tutorials and challenges. Its primary purpose is to help developers understand git through the power of visualization (something that's absent when working on the command line).

You can input a variety of commands into LearnGitBranching (LGB) -- as commands are processed, the nearby commit tree will dynamically update to reflect the effects of each command:


<img src="https://raw.github.com/pcottle/learnGitBranching/master/assets/learnGitBranching.png"/>

This visualization combined with tutorials and "levels" can help both beginners and intermediate developers polish their version control skills. A quick demo is available here:
http://pcottle.github.com/learnGitBranching/?demo

Or you can launch the application normally here:
http://pcottle.github.com/learnGitBranching/

### Sandbox Mode

By default the application launches in "sandbox mode" with a basic repository already created. Here you can enter commands and mess around with a repository as much as you like. Keep in mind you can

* `undo` to undo the effects of the last command
* `reset` to start over from a clean slate (works in levels too)
* `git clone` to play with remote repositories!

Sandbox mode can be great for demonstrating something to a friend, but the real learning is with levels...

## Levels

Type `levels` to see the available lessons / challenges (and which ones you have solved so far). Each level series aims to teach some high-level git concept, and each tab of levels separates major worlds of info (like remote repositories versus local).

For some added fun, there is a "git golf" concept where we keep track of how many commands you use to solve each level. See if you can match all of our records!

### Level Builder

You can build levels with `build level`. The dialog will walk you through the process, and at the end you can `export level` to get a JSON blob. Paste that in a gist or directly into an issue and I can check it out / merge in your changes! You can also share this level directly with friends by having them run "import level"

## How the app works / contributing functionality

LearnGitBranching is a pretty simple application (from a technical perspective). There's no backend database or any AJAX requests -- it's a 100% clientside application written in Javascript. The production version (on github.io) literally just serves up an html page with some JS and CSS. The rest of the magic lies in the 9k+ lines of Javascript :P

Because the app contains a lot of code, I have written everything into Nodejs-style modules. The modules are packaged together with the `Browserify` and then sent down in a format the browser can understand.

As of December 2013, I've migrated the build process to use Grunt >0.4, since the older version was giving a lot of people build headaches. It should be fairly rock solid now!

Here is the high level process of the build:

* Code is written into the node.js modules which require other modules
* CSS is written into just one stylesheet (theres not a whole ton of styling)
* New HTML is written into a template html file (`template.index.html`). Only needed
  for new views
* The app is "built", which outputs:
  * `index.html` in the root directory
  * CSS and JS files in `./build` directory
* If the app is being built for production, then these CSS and JS files
  are hashed (to bust caches) and tests are run
* That's it!

Thus, if you build the app locally, all you have to do in order to run the app is just open up `index.html` in the root directory of the repo. Pretty simple

## Building yourself / Contributing Functionality

For contributing core functionality in the app, you'll probably want to test your changes
at least once before submitting a pull request. That means you'll need the "Grunt.js" build tool to build the app:

http://gruntjs.com/getting-started

You'll also need `npm` to download all the dependencies of the project.

The general workflow / steps are below:

```
git clone <your fork of the repo>
cd learnGitBranching
npm install # to install all the node modules I depend on

git checkout -b newAwesomeFeature
vim ./src/js/git/index.js # some changes
grunt fastBuild # skips tests and linting, faster build

# after building you can open up your browser to the index.html
# file generated and see your changes

vim ./src/js/git/index.js # more changes
grunt build # runs tests and lint

git commit -am "My new sweet feature!"
git push
# go online and request a pull
```

## Helpful Folks
A big shoutout to these brave souls for extensively testing our sandbox and finding bugs and/or inconsistencies:

* Nikita Kouevda
* Maksim Ioffe
* Dan Miller

And the following heroes for assisting in translating:
* Jake Chen
* 우리깃 ("urigit")
* "bcho"
* "scientific-coder"
* "ace-coder"
* Joël Thieffry
* Jens Bremmekamp ("nem75")
* "hilojack"

Also huge shoutout for everyone who has put up a pull request that was pulled:

* Aaron Schrab - 5x!!
* Stephen Cavaliere
* Andrew Ardill
* Shao-Chung Chen
* Tobias Pfeiffer
* Luke Kysow - 2
* Adam Brodzinski
* Hamish Macpherson
* Cameron Wills
* Johan ("josso")
* Frode Austvik
* Don Kirkby x2
* "scientific-coder"
* "ace-coder"
* Jeffrey Fisher
* Brad Smith
* Allen Guo
* Timothy Qiu
* Hyunjin CHA
* Jens Bremmekamp ("nem75")
* Fabio Crisci (piuccio)
* Max Sikström (pengi) [tag support!!]
* "rogererens"
* Emanuel Schorsch
* Carl X. Su

Or reported an issue that was successfully closed!

* Caspar Krieger
* Stuart Knightley
* John Gietzen
* Chris Greene
* "datton"
* Jaymes Bearden
* Jan-Erik Rediger
* Scott Bigelow
* "ortin"
* Dave Myron
* "chosenken"
* Mael P ("maelp")
* "flying-sheep"
* "arianvp"
* "MaPePeR"
* Lutz ("mobilutz")
* Jan Philipp
* Jon Frisby
* Matthew Walker
* Duane Johnson
* Neil Chue Hong
* "Goodwine"
* Brandon McCaig
* Borislav Kosharov
* Ben Heavner
* Michael (mick-d)
* Adam Brewer
* Tobias Pfeiffer
* Nicholas "LB" Braden
* Jeffrey Jones
* Kyle (kyleIDMI)
* "iplus"
* Christian Sauer
* "alvarogarcia7"
* Il Memming Park
* Neil Traft

