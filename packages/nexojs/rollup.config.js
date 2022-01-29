import typescript from "@rollup/plugin-typescript";
import banner from "rollup-plugin-banner";

export default [
    {
        input: "./build/Nexo.js",
        output: [
            {
                file: "./dist/mjs.js",
                format: "es",
                plugins: [
                    typescript({
                        tsconfig: "./tsconfig.json",
                    }),
                    watch({
                        dir: "./build",
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
                    watch({
                        dir: "./build",
                    }),
                ],
            },
        ],
    },
    {
        input: "./build/Bin.js",
        output: [
            {
                file: "./dist/bin.mjs.js",
                format: "es",
                plugins: [
                    banner(() => {
                        return "#!/usr/bin/env node --no-warnings --experimental-specifier-resolution=node";
                    }),
                    typescript({
                        tsconfig: "./tsconfig.json",
                    }),
                    watch({
                        dir: "./build",
                    }),
                ],
            },
            {
                file: "./dist/bin.cjs.cjs",
                format: "cjs",
                plugins: [
                    banner(() => {
                        return "#!/usr/bin/env node --no-warnings --experimental-specifier-resolution=node";
                    }),
                    typescript({
                        tsconfig: "./tsconfig.json",
                    }),
                    watch({
                        dir: "./build",
                    }),
                ],
            },
        ],
    },
];
