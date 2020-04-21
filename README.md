# Three-bootstrap-react template

I'm constantly using the same boilerplate to create web apps with

- React
- Bootstrap
- Three.js

So I made a boilerplate repo to start easily.

## Requirements

[Install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

[Install node.js](https://nodejs.org/en/)

## Clone the repo to get started

`git clone https://github.com/benolayinka/three-bootstrap-react-template.git` will clone in to `three-bootstrap-react-template`

`cd three-bootstrap-react-template` will enter the folder. See below to run or build the template.

## Running the app locally

`npm install` to install necessary packages

`npm start` to run the app in development mode with hot reloading

## Building the app

`npm run build` will build production assets to /build

## Dependencies

The app is built using some of my own bit.dev packages
- benolayinka.benolayinka.three-scene-renderer
- benolayinka.benolayinka.utils

.npmrc resolves @bit packages.

## Troubleshooting

`npm start fails: sh: react-scripts: command not found`

Packages aren't installed. Run:

`npm install`
