# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LearnGitBranching is an interactive git visualization tool for teaching git concepts through a game-like interface. It's a 100% client-side JavaScript application that simulates git operations and renders them visually using Raphael.js for SVG graphics.

## Build & Development Commands

### Setup
```bash
yarn install
```

### Building
```bash
yarn gulp fastBuild    # Fast build without tests/linting
yarn gulp build        # Full production build with tests & lint
yarn gulp watching     # Watch mode - rebuilds on file changes
```

### Testing & Linting
```bash
yarn test              # Run Jasmine test suite
yarn test:coverage     # Run tests with nyc coverage
gulp jshint            # Run JSHint linter
gulp lintStrings       # Validate internationalization strings
```

### Development Server
```bash
yarn dev               # Start Vite dev server
# After building, open index.html directly in browser
```

### Single Test Execution
```bash
# Run specific test file
npx gulp-jasmine __tests__/git.spec.js
```

## Architecture Overview

### Core Components

**GitEngine** (`src/js/git/index.js`)
- The heart of the application - simulates all git operations
- Manages the commit graph, branches, tags, refs, and HEAD
- Processes commands and updates the visualization
- Supports both git and Mercurial (hg) modes via `mode` property
- Uses EventBaton pattern for command dispatching

**Visualization System** (`src/js/visuals/`)
- `visualization.js`: Main visualization controller
- `tree.js`: Renders the commit tree using Raphael.js
- `visNode.js`, `visBranch.js`, `visTag.js`, `visEdge.js`: Individual visual components
- `animation/`: Animation system using promise chains (Q library)

**Command Processing** (`src/js/commands/index.js`, `src/js/git/commands.js`)
- Commands are defined with regex patterns, options, and execute functions
- Supports both git and Mercurial command sets
- Command delegation system allows commands to internally invoke other commands
- All git commands are simulated - they manipulate in-memory data structures

**Levels System** (`src/levels/`)
- Each level is a JavaScript module exporting level configuration
- Organized into sequences: intro, rampup, move, mixed, advanced, remote, remoteAdvanced
- Level definition includes: name, goal description, starting tree state, solution validation
- See `src/levels/index.js` for all level sequences

### Flux Architecture

The app uses a Flux-like architecture:

**Dispatcher** (`src/js/dispatcher/AppDispatcher.js`)
- Central event bus using Facebook's Flux Dispatcher
- Handles VIEW_ACTION and URI_ACTION payload sources

**Stores** (`src/js/stores/`)
- `CommandLineStore.js`: Manages command line state
- `LevelStore.js`: Tracks current level and progress
- `LocaleStore.js`: Handles internationalization
- `GlobalStateStore.js`: Global application state

**Actions** (`src/js/actions/`)
- Action creators for CommandLine, Level, Locale, and GlobalState

### UI Components

**Backbone Views** (`src/js/views/`)
- Legacy Backbone.js views for modals, dialogs, builders
- `gitDemonstrationView.js`: Shows animated git command demonstrations

**React Components** (`src/js/react_views/`)
- Modern React components for command line, toolbar, helper bars
- Command history view with syntax highlighting

### Key Patterns

**EventBaton** (`src/js/util/eventBaton.js`)
- Pattern for transferring event handling responsibility
- Used extensively for command processing and level events

**TreeCompare** (`src/js/graph/treeCompare.js`)
- Compares two commit trees for level completion validation
- Handles branch positions, commit structure, tags

**Animation Chains**
- All visual updates go through animation queue
- Uses Q promises to chain animations
- Can be disabled for testing (headless mode)

## Project Structure

```
src/
├── js/
│   ├── app/           # Application bootstrapping
│   ├── git/           # Git engine and commands
│   ├── mercurial/     # Mercurial (hg) support
│   ├── commands/      # Command parsing and execution
│   ├── level/         # Level loading and validation
│   ├── visuals/       # Visualization and animation
│   ├── views/         # Backbone views
│   ├── react_views/   # React components
│   ├── stores/        # Flux stores
│   ├── actions/       # Flux actions
│   ├── models/        # Backbone models and collections
│   ├── intl/          # Internationalization
│   ├── graph/         # Tree comparison logic
│   └── util/          # Utilities
├── levels/            # Level definitions organized by category
├── style/             # CSS files
└── template.index.html # HTML template

__tests__/             # Jasmine test specs
```

## Build Process

The gulp build process:
1. Browserify bundles all JS files (including JSX with Babel transform)
2. CSS files concatenated and minified (production)
3. Files are hashed for cache busting
4. `template.index.html` is processed with hashed filenames to generate `index.html`
5. Tests run with Jasmine, linting with JSHint

Production builds minify JS with Terser and HTML with html-minifier.

## Key Technologies

- **Backbone.js**: MVC framework (legacy parts)
- **React 17**: UI components (modern parts)
- **Flux**: Unidirectional data flow
- **Raphael.js**: SVG graphics for visualization
- **Q**: Promises for animation chains
- **jQuery/jQuery UI**: DOM manipulation and dialogs
- **Browserify + Babel**: Module bundling and JSX transform
- **Gulp**: Build automation
- **Jasmine**: Testing framework

## Testing Conventions

- Tests in `__tests__/` directory
- Headless git engine for testing (`src/js/git/headless.js`)
- Use `create.js` helper to set up test git trees
- Mock commands with `mock.js` utility
- Tests cover git operations, remote operations, levels, tree comparison

## Remote Repository Simulation

Remote operations (push/pull/fetch) are simulated by creating a separate GitEngine instance for the "origin" repository. The `o/` prefix denotes remote tracking branches.

## Internationalization

String translations in `src/js/intl/strings.js`. Use `intl.str()` and `intl.getDialog()` to access localized strings. Locale validation via `checkStrings.js`.
