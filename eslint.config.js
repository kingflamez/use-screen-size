const js = require("@eslint/js");
const react = require("eslint-plugin-react");
const typescript = require("@typescript-eslint/eslint-plugin");
const parser = require("@typescript-eslint/parser");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        globals: {
          window: "readonly",
          NodeJS: "readonly",
          setTimeout: "readonly",
          clearTimeout: "readonly",
        },
      },
    },
    plugins: {
      react,
      "@typescript-eslint": typescript,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Not required for React 17+
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],
      "no-undef": "off", // Disable undefined variable checks (handled by globals)
      "react/prop-types": "off", // Disable PropTypes rules for TS
    },
  },
  {
    // Override configuration for test files
    files: ["**/*.test.{ts,tsx}", "**/__tests__/**/*.{ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        beforeEach: "readonly",
        afterAll: "readonly",
        afterEach: "readonly",
        jest: "readonly",
        window: "readonly",
        Event: "readonly",
      },
    },
    rules: {
      "no-undef": "off", // Turn off undefined errors for test globals
    },
  },
];
