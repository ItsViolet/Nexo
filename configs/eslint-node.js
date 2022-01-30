module.exports = {
  extends: ["airbnb-base", "airbnb-typescript/base"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
      indent: ["error", 4],
      "@typescript-eslint/indent": ["error", 4],
      "class-methods-use-this": [0]
  },
};
