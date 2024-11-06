# LearnGitBranching

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?)](https://github.com/pcottle/learnGitBranching/pulls)

LearnGitBranching is a git repository visualizer, sandbox, and a series of educational tutorials and challenges. Its primary purpose is to help developers understand git through the power of visualization (something that's absent when working on the command line). This is achieved through a game with different levels to get acquainted with the different git commands.

You can input a variety of commands into LearnGitBranching (LGB) -- as commands are processed, the nearby commit tree will dynamically update to reflect the effects of each command:

![demo-gif](https://user-images.githubusercontent.com/6324814/108740487-02c3c400-7536-11eb-9dd1-53275cdf76fb.gif)

This visualization combined with tutorials and "levels" can help both beginners and intermediate developers polish their version control skills. A quick demo is available here:
https://pcottle.github.io/learnGitBranching/?demo

Or, you can launch the application normally here:
https://pcottle.github.io/learnGitBranching/

### Sandbox Mode

By default the application launches in "sandbox mode" with a basic repository already created. Here you can enter commands and mess around with a repository as much as you like. Keep in mind you can

* `undo` to undo the effects of the last command
* `reset` to start over with a clean slate (works in levels too)
* `git clone` to simulate remote repositories!

Sandbox mode can be great for demonstrating something to a friend, but the real learning is with levels...

## Levels

Type `levels` to see the available lessons / challenges (and which ones you have solved so far). Each level series aims to teach some high-level git concept, and each tab of levels separates major worlds of info (like remote repositories versus local).

For some added fun, there is a "git golf" concept where we keep track of how many commands you use to solve each level. See if you can match all of our records!

### Sharing permalinks

You can share a link to LearnGitBranching with an arbitrary set of commands that will execute upon load by using the `command` URL parameter. You will also likely want to disable the intro dialog for this case with the `NODEMO` url param; here is [an example](https://learngitbranching.js.org/?NODEMO&command=echo%20%22hello%22;%20git%20commit) to get started.

### Level Builder

You can build levels with the `build level` command. A dialog will walk you through the process, and at the end it will show you a JSON blob that represents the level you just created. Paste that in a [gist](https://gist.github.com) or directly into an issue and I can check it out / merge in your changes! You can also share this level directly with friends by having them run `import level` and paste the JSON in the resulting text field, or simply send them a custom URL with the the gist ID in the parameters, like so:
https://pcottle.github.io/learnGitBranching/?gist_level_id=a84407351f9c9f0cb241

## Reporting Bugs / Opening Issues

When reporting bugs, try running the command `debug_copyTree()` in your JS console when in a state just before reproducing a bug. This can avoid having to copy all the commands you used to get into a specific state. (I can then use the `importTreeNow` command to get to that exact state)

## Building yourself / Contributing Functionality

For contributing core functionality in the app, you'll probably want to test your changes
at least once before submitting a pull request. That means you'll need the "gulp.js" build tool to build the app:

https://gulpjs.com/docs/en/getting-started/quick-start

You'll also need `yarn` to download all the dependencies of the project.

The general workflow / steps are below:

```bash
git clone <your fork of the repo>
cd learnGitBranching
yarn install

git checkout -b newAwesomeFeature
vim ./src/js/git/index.js # some changes
yarn gulp fastBuild # skips tests and linting, faster build

# after building you can open up your browser to the index.html
open ./index.html
# file generated and see your changes

vim ./src/js/git/index.js # more changes
yarn gulp build # runs tests and lint

git commit -am "My new sweet feature!"
git push
# go online and request a pull
```

Alternatively, you can also build and run the app in a pre-configured online workspace:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/pcottle/learnGitBranching/blob/main/src/js/git/index.js)
[![Open in Codeanywhere](https://codeanywhere.com/img/open-in-codeanywhere-btn.svg)](https://app.codeanywhere.com/#https://github.com/pcottle/learnGitBranching)


## Other Technical Details

LearnGitBranching is a pretty simple application (from a technical perspective). There's no backend database or any AJAX requests -- it's a 100% clientside application written in JavaScript. The production version (on github.io) literally just serves up an HTML page with some JS and CSS.

Here is the high-level process of the build:

* CSS is written into just one stylesheet (there is not a whole ton of styling)
* New HTML is written into a template HTML file (`template.index.html`). This is only needed
  for new views
* The app is "built", which outputs:
  * `index.html` in the root directory
  * CSS and JS files in `./build` directory
* If the app is being built for production, then these CSS and JS files
  are hashed (to bust caches) and tests are run
* That's it!

Thus, if you build the app locally, all you have to do in order to run the app is just open up `index.html` in the root directory of the repo. Pretty simple

### Docker

You can run the most recently built stable image with `docker run -p 8080:80 ghcr.io/pcottle/learngitbranching:main`. Access your environment with at [http://localhost:8080/](<http://localhost:8080/>)

You can build the app and image with the command: `docker build -t ghcr.io/pcottle/learngitbranching:latest`. See the [Makefile](Makefile) for information on how to build locally with docker.

## Some of our amazing contributors

[//]: contributor-faces
<a href="https://github.com/pcottle"><img src="https://avatars0.githubusercontent.com/u/1135007?v=4" title="pcottle" width="80" height="80"></a>
<a href="https://github.com/Hongarc"><img src="https://avatars1.githubusercontent.com/u/19208123?v=4" title="Hongarc" width="80" height="80"></a>
<a href="https://github.com/twmht"><img src="https://avatars1.githubusercontent.com/u/1567200?v=4" title="twmht" width="80" height="80"></a>
<a href="https://github.com/JuhoKang"><img src="https://avatars1.githubusercontent.com/u/4745294?v=4" title="JuhoKang" width="80" height="80"></a>
<a href="https://github.com/sunshowers"><img src="https://avatars3.githubusercontent.com/u/180618?v=4" title="sunshowers" width="80" height="80"></a>
<a href="https://github.com/sPATROL"><img src="https://avatars0.githubusercontent.com/u/11875983?v=4" title="sPATROL" width="80" height="80"></a>
<a href="https://github.com/coyl"><img src="https://avatars1.githubusercontent.com/u/274452?v=4" title="coyl" width="80" height="80"></a>
<a href="https://github.com/alexeiberkov"><img src="https://avatars1.githubusercontent.com/u/4151345?v=4" title="alexeiberkov" width="80" height="80"></a>
<a href="https://github.com/aschrab"><img src="https://avatars1.githubusercontent.com/u/39620?v=4" title="aschrab" width="80" height="80"></a>
<a href="https://github.com/bcbcarl"><img src="https://avatars0.githubusercontent.com/u/135734?v=4" title="bcbcarl" width="80" height="80"></a>
<a href="https://github.com/ahonorat"><img src="https://avatars1.githubusercontent.com/u/5851945?v=4" title="ahonorat" width="80" height="80"></a>
<a href="https://github.com/nem75"><img src="https://avatars0.githubusercontent.com/u/1327785?v=4" title="nem75" width="80" height="80"></a>
<a href="https://github.com/eatdrinksleepcode"><img src="https://avatars0.githubusercontent.com/u/2099560?v=4" title="eatdrinksleepcode" width="80" height="80"></a>
<a href="https://github.com/nlehuby"><img src="https://avatars3.githubusercontent.com/u/919962?v=4" title="nlehuby" width="80" height="80"></a>
<a href="https://github.com/alexandear"><img src="https://avatars2.githubusercontent.com/u/3228886?v=4" title="alexandear" width="80" height="80"></a>
<a href="https://github.com/PanAeon"><img src="https://avatars3.githubusercontent.com/u/686076?v=4" title="PanAeon" width="80" height="80"></a>
<a href="https://github.com/donkirkby"><img src="https://avatars1.githubusercontent.com/u/1639148?v=4" title="donkirkby" width="80" height="80"></a>
<a href="https://github.com/lroellin"><img src="https://avatars1.githubusercontent.com/u/3150983?v=4" title="lroellin" width="80" height="80"></a>
<a href="https://github.com/ptsoccer"><img src="https://avatars1.githubusercontent.com/u/1102725?v=4" title="ptsoccer" width="80" height="80"></a>
<a href="https://github.com/jankeromnes"><img src="https://avatars2.githubusercontent.com/u/599268?v=4" title="jankeromnes" width="80" height="80"></a>
<a href="https://github.com/qiansen1386"><img src="https://avatars2.githubusercontent.com/u/1759658?v=4" title="qiansen1386" width="80" height="80"></a>
<a href="https://github.com/renderf0x"><img src="https://avatars1.githubusercontent.com/u/6155643?v=4" title="renderf0x" width="80" height="80"></a>
<a href="https://github.com/filipefilardi"><img src="https://avatars1.githubusercontent.com/u/7308241?v=4" title="filipefilardi" width="80" height="80"></a>
<a href="https://github.com/rebangm"><img src="https://avatars2.githubusercontent.com/u/1638136?v=4" title="rebangm" width="80" height="80"></a>
<a href="https://github.com/marcolivierarsenault"><img src="https://avatars2.githubusercontent.com/u/2634090?v=4" title="marcolivierarsenault" width="80" height="80"></a>
<a href="https://github.com/pengi"><img src="https://avatars0.githubusercontent.com/u/1087673?v=4" title="pengi" width="80" height="80"></a>
<a href="https://github.com/waldyrious"><img src="https://avatars2.githubusercontent.com/u/478237?v=4" title="waldyrious" width="80" height="80"></a>
<a href="https://github.com/tym-network"><img src="https://avatars1.githubusercontent.com/u/2879545?v=4" title="tym-network" width="80" height="80"></a>
<a href="https://github.com/zhyu"><img src="https://avatars1.githubusercontent.com/u/1728523?v=4" title="zhyu" width="80" height="80"></a>
<a href="https://github.com/mgarciaisaia"><img src="https://avatars1.githubusercontent.com/u/1190974?v=4" title="mgarciaisaia" width="80" height="80"></a>
<a href="https://github.com/YourSenseiCreeper"><img src="https://avatars1.githubusercontent.com/u/6324814?&v=4" title="YourSenseiCreeper" width="80" height="80"></a>
<a href="https://github.com/olsza"><img src="https://avatars1.githubusercontent.com/u/12556170?v=4" title="Olsza" width="80" height="80"></a>

[//]: contributor-faces

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
* Ming-Hsuan-Tu ("twmht")
* Mikhail Usov ("mikhailusov")
* Matias Garcia Isaia ("mgarciaisaia")
* Marc-Olivier Arsenault ("marcolivierarsenault")
* Eroany H Leader ("lhyqy5")
* Honorat ("ahonorat")
* Vasil Kulakov ("coyl") & Lyubov Agadjanyan ("shayenblue")
* Aliaksei Berkau ("alexeiberkov")
* Mizunashi Mana ("mizunashi-mana")
* YourSenseiCreeper
* Olsza

Also huge shoutout for everyone who has put up a pull request that was pulled! Check out the 30+ contributors we have in the [Contributors View](https://github.com/pcottle/learnGitBranching/graphs/contributors)

And everyone who has reported an issue that was successfully closed!
