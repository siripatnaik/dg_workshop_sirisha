# Diagnal_workshop

## diagnal_workshop

#### About this app

This app consists of a home page where user can navigate through a list of contents using arrow keys (left/right arrow keys)
User will be shown a timer which represents the current time in HH:MM 24hr format

The fonts used in this app belong to Titillium Web family which are downloaded from google fonts

#### Components
Two main components are used in this app development
1. HomePage : this page consists of the Title, description of current focused content and the tray of available contents for the user
2. ContentCard : This card component is for individual content (poster + title) which is reused for every content of the tray in HomePage

#### Animation
When user focus on each content card, the particular asset under focus is highlighted and the content details like the show title and its description are shown in HomePage with a fade-in effect

## LightningJS
### Getting started

> Before you follow the steps below, make sure you have the
[Lightning-CLI](https://rdkcentral.github.io/Lightning-CLI/#/) installed _globally_ only your system

```
npm install -g @lightningjs/cli
```

#### Running the App

1. Install the NPM dependencies by running `npm install`

2. Build the App using the _Lightning-CLI_ by running `lng build` inside the root of your project

3. Fire up a local webserver and open the App in a browser by running `lng serve` inside the root of your project

#### Developing the App

During development you can use the **watcher** functionality of the _Lightning-CLI_.

- use `lng watch` to automatically _rebuild_ your App whenever you make a change in the `src` or  `static` folder
- use `lng dev` to start the watcher and run a local webserver / open the App in a browser _at the same time_

#### Documentation

Use `lng docs` to open up the Lightning-SDK documentation.

