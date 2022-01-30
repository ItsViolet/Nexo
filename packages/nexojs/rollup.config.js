import typescript from "@rollup/plugin-typescript";

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
  {
    input: "./build/Bin.js",
    output: [
      {
        file: "./dist/bin.mjs.js",
        format: "es",
        banner:
          "#!/usr/bin/env node --no-warnings --experimental-specifier-resolution=node",
        plugins: [
          typescript({
            tsconfig: "./tsconfig.json",
          }),
        ],
      }
    ],
  },
];
