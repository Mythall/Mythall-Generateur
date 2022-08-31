# Mythall-3.5

This is the final version of Mythall Web App & Generator

Built using basic html, css & javascript for easy collaboration

# How to use

npm install

Unix users:

npm run dev

Windows users - Use 2 terminal for the following commands:

npm run watch

npm run emulator

This will build & watch the project for you and run the firebase emulator on localhost:3000

# Requirements

Install the VS Code extension Prettier

Do not change .pretttierrc.json file, these are the standards we use for a uniform coding experience

# Information

We use Vite as a mobule bundler for firebase

Update files in src/

Compile to dist

New routes must be added to vite.config.js to be built

# Documentation

MDN (The basics for us peasants) - https://developer.mozilla.org/en-US/

Firebase (Database, Hosting, the nice stuff, etc...) - https://firebase.google.com/docs

Vite (Module bundler) - https://vitejs.dev/

BEM (CSS naming convention) - http://getbem.com/naming/

# Deploy

When you develop, create a feature branch for your update.

Once published, the project owner will merge it to the main branch.

Deploy will be automatic once merged using a github action.
