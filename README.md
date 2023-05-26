<div>
  <div align="center">
    <img src="https://github.com/warrend/varbq/blob/develop/images/logo.png?raw=true" alt="varbq logo" width="auto" height="165px">
    <h1>varbq</h1>
  </div>
</div>

<hr />

varbq is a package that helps you generate CSS and TypeScript variable files based on a theme configuration.

## Installation

To install varbq, use npm or yarn:

`npm install varbq`

## Usage

Once installed, you can use the following commands:

`npx varbq build`

Generates CSS and TypeScript variable files based on the theme configuration. This command should be run from the root directory of your project.

This command will also create the varbq.json file with default configuration (if it doesn't exist already) and generate the CSS and TypeScript files in the theme folder.

## varbq watch

Watches for changes in the theme configuration file (varbq.json) and automatically rebuilds the CSS and TypeScript files whenever a change is detected.

`npx varbq watch`

This command will start watching the varbq.json file and regenerate the CSS and TypeScript files whenever it changes.

## Args

You can also pass in the following flags:

`--js` will only generate the ts file. For example: `npx varbq watch --js`.

`--css` will only generate the css file. For example: `npx varbq build --css`.

If no flags are passed, both files will be created by default.

## Configuration

The varbq.json file contains the theme configuration. The key names can be whatever you want as long as nothing is nested and each key name contains an array of values.

```json
{
  "primary": ["hsl(216, 99%, 98%)", "hsl(216, 98%, 92%)", "hsl(216, 95%, 86%)"],
  "secondary": ["hsl(40, 99%, 98%)", "hsl(40, 98%, 92%)", "hsl(40, 95%, 86%)"],
  "typography": ["8px", "10px", "12px", "16px", "24px"],
  "spacing": ["4px", "8px", "12px", "16px"]
}
```

Modify the colors, typography, and spacing variables (or whatever else you want) to customize the generated CSS and TypeScript files. Each array gets converted into the key name plus adds 100 onto each successive item in the array. For example, the primary key becomes:

```css
:root {
  --primary100: hsl(216, 99%, 98%);
  --primary200: hsl(216, 98%, 92%);
  --primary300: hsl(216, 95%, 86%);
  ...;
}
```

And:

```ts
export const varbq = {
  primary100: "hsl(216, 99%, 98%)",
  primary200: "hsl(216, 98%, 92%)",
  primary300: "hsl(216, 95%, 86%)",
  ...
}
```

## Integrating with npm scripts

To automatically run `npx varbq watch` when starting your development server, you can add it to your start or dev script in the scripts section of your package.json file.

For example, if your package.json file has the following script:

```json
"scripts": {
  "dev": "npm run start",
  "start": "node server.js"
}
```

You can modify it to include npx varbq watch:

```json
"scripts": {
  "dev": "npm run start & npx varbq watch",
  "start": "node server.js"
}
```

Now, when you run npm run dev, it will start your development server and concurrently run npx varbq watch to regenerate the CSS and TypeScript files whenever a change is detected in the varbq.json file.

Remember to adjust the script configuration based on your project setup. And don't forget to import the variable files where needed.
