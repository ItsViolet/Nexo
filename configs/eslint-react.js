module.exports = {
  extends: ["airbnb", "airbnb-typescript"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    indent: ["error", 4],
    "@typescript-eslint/indent": ["error", 4],
  },
};
