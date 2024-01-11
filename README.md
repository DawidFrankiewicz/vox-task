# Colored Block Generator | VOX Recruitment Task

This is a simple web application that allows you to generate a block with an random color. You can remove block or change it's color, swap blocks positions by drag & drop.

The application is written in Vue 3 with TypeScript, SCSS and uses Vite as a build tool.

## Live Demo

You can check the live demo [here](https://dawidfrankiewicz.github.io/vox-task/).

This demo is hosted on GitHub Pages and uses GitHub Actions to automatically deploy the `dist` folder to the `gh-pages` branch on every push to `main` branch.

## Project setup

To install dependencies, run `npm install`.

To start the development server, run `npm run dev` and build with `npm run build`.

## Unit Tests

Unit tests are written with Vitest and are contained in `tests` folder. To run them, use `npm run test`. You can also check coverage with `npm run test:coverage`.

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
