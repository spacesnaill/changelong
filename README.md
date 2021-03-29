# Changelong

> ✨ Bootstrapped with Create Snowpack App (CSA).

## Description

Accepts an input of an Owner and a Repo and returns the full list of releases for that repo. The user can then search that repo with fuzzy searching

Leverages:

- React
- React Virtuoso to render only what's in the viewport
- Fuse.js for fuzzy searching
- Snowpack for bundling / builds

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
