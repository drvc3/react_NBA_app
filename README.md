# React NBA App

A responsive NBA news and video application built with React. The app displays featured stories, paginated news, team information, video content, and related videos using data from Firebase.

## Live demo

[View the NBA app on GitHub Pages](https://drvc3.github.io/react_NBA_app/)

## Features

- Featured NBA news carousel
- News and video listings with load-more pagination
- Individual article and video pages
- Team logos, records, and article metadata
- Related videos by team
- Firebase email/password authentication
- GitHub Pages-compatible hash routing
- Visible error messages when public content cannot be loaded

## Tech stack

- React 16
- React Router 5
- Firebase Authentication and Realtime Database REST API
- React Slick
- CSS Modules
- Webpack 4
- GitHub Pages

## Local development

Requirements:

- Node.js
- npm

Install dependencies and start the development server:

```bash
npm install --legacy-peer-deps
npm start
```

Create a production build:

```bash
npm run build
```

The production build is written to `build/` and configured for the `/react_NBA_app/` project path.

## Data and assets

Public articles, teams, and videos are read from the app's Firebase Realtime Database JSON endpoint. Firebase remains responsible for authentication. Static logos and media thumbnails are served from `public/images/` using the configured GitHub Pages base path.

## Deployment

The repository uses two branches:

- `development` contains the application source and generated build.
- `master` serves the contents of the production build through GitHub Pages.

Live routes use URL hashes, such as `#/news` and `#/videos`, so refreshing a nested route works on GitHub Pages without a custom server fallback.
