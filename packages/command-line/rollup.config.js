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
