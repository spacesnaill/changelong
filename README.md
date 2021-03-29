# Changelong

> ✨ Bootstrapped with Create Snowpack App (CSA).

## Description

Accepts an input of an Owner and a Repo and returns the full list of releases for that repo. The user can then search that repo with fuzzy searching

Leverages:

- React
- React Virtuoso to render only what's in the viewport
- Fuse.js for fuzzy searching
- Snowpack for bundling / builds

## TODO

- Pull code out of the App component and place it into its own components as App is extremely messy right now
- Testing of any kind, in general. There are no tests right now
- Fix the layout on mobile, right now it is extremely squashed. Inputs need to stack on each other
- Fix the paper with text on it from going off the screen. There's already a scroll bar due to the virtualization, having the box go off the screen and cause another scroll bar looks and feels atrocious. Should limit the height to the viewport.
- Auto-populate the Repo with options when a valid owner is provided. Would be preferable if this list was sorted and searchable as well.

## Available Scripts

### yarn start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### yarn run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like "@snowpack/plugin-webpack" to your `snowpack.config.js` config file.

### yarn test

Launches the application test runner.
Run with the `--watch` flag (`npm test -- --watch`) to run in interactive watch mode.
