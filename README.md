# Mythall-3.5

This is the code for the Mythall Character Generator

Built using basic html, css & javascript for easy collaboration

Live URL: https://mythall.web.app

Dev URL: https://dev-mythall.web.app

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

We have 2 environments; Mythall & Dev-Mythall

Branch are main & dev

Always make sure dev is up to date with main before creating your pull request:

git checkout dev

git fetch origin

git merge origin/main

You can repeat the same process with your own branch to avoid conflict as much as possible.

Once your feature branch is ready to deploy and test, push it to git

Create a pull request from your branch into dev

Wait for the automatic deploy to happen (2 mins on average)

Test your new features

Adjusts and repeat the process until everything is good to go

When you are ready to deploy to production, create a pull request of your branch into main

An admin will have to review and approve your pull request

Once approved it will automaticly update the live environment

# Backup & Restore Firestore

Open a cloud shell with owner account at https://console.cloud.google.com/welcome?project=mythall-v7&cloudshell=true

Use the commands to backup firestore:

gcloud config set project mythall-v7

gcloud firestore export gs://mythall-v7.appspot.com --async

To copy live database to dev (Update the timestamp to last backup):

gcloud alpha storage cp --recursive gs://mythall-v7.appspot.com/2022-09-02T15:48:43_56723/ gs://mythall-dev.appspot.com

gcloud config set project mythall-dev

gcloud firestore import gs://mythall-dev.appspot.com/2022-09-02T15:48:43_56723 --async

# To transfer Users from Authentication from live to dev

firebase auth:export AllUsers.json --project mythall-v7

firebase auth:import AllUsers.json --project mythall-dev

Password hashes are not the same, so you will have to go throught forgot password and reset it for your account

You can delete the AllUsers.json file in your project, but it's also ignored by git
