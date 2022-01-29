import typescript from "@rollup/plugin-typescript";
import watch from "rollup-plugin-watch";

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
];
