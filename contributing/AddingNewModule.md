# Adding New Modules
This guide has requirements for creating new modules in this project.

###### Step 1
Create the new project.
**NOTE:**
-   Make sure that the main script is `./dist/cjs.cjs`
```
lerna create @nexo/<ModuleName>
```

###### Step 2
Install TypeScript.
```
lerna add typescript
```

###### Step 3
Updating package file.
-   Add `type` and set it to `module`.
-   Add `types` and set it to `./types/<Module>.d.ts`.
-   Add `exports` and set it to `{ "require": "./dist/cjs.cjs", "import": "./dist/mjs.js" }`.
-   Set `files` to `[ "dist", "types" ]`.
-   Set `directories` to `{ "dist": "dist", "types": "types" }`.
-   Set `script` to `{ "watch": "nodemon --watch src -e ts --exec \"npx tsc --build && npx rollup -c\"" }`.

###### Step 4
Installing dependencies.
```
lerna add @rollup/plugin-typescript nodemon typescript rollup --dev --scope @nexojs/<Module>
```

###### Creating RollupJS config
Create a `rollup.config.js` in the new project's root and set its contents to the following.
```js
import typescript from "@rollup/plugin-typescript";

export default [
    {
        input: "./build/CommandLine.js",
        output: [
            {
                file: "./dist/mjs.js",
                format: "es",
                plugins: [
                    typescript({
                        tsconfig: "./tsconfig.json",
                    }),
                ],
            },
            {
                file: "./dist/cjs.cjs",
                format: "cjs",
                plugins: [
                    typescript({
                        tsconfig: "./tsconfig.json",
                    }),
                ],
            },
        ],
    },
];
```

###### Step 5
Add a `tsconfig.json` to the new project's root with the following contents.
```json
{
    "extends": "../../tsconfig.json",
    "compilerOptions": {
        "outDir": "./build",
        "declarationDir": "./types",
    },
    "include": ["./src/**/*.ts"]
}
```
