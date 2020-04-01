import globals from "globals"
import prettierConfig from "eslint-config-prettier"
import pluginA11y from "eslint-plugin-jsx-a11y"
import pluginImport from "eslint-plugin-import"
import pluginHooks from "eslint-plugin-react-hooks"
import pluginReact from "eslint-plugin-react"
import pluginUnicorn from "eslint-plugin-unicorn"

export default [
  { ignores: ["**/build/**"] },
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      parserOptions: {
        // Use the latest ECMAScript version
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ignores: ["!**/.server", "!**/.client"],
    plugins: {
      "jsx-a11y": pluginA11y,
      "react-hooks": pluginHooks,
      import: pluginImport,
      react: pluginReact,
      unicorn: pluginUnicorn,
    },
    settings: {
      react: {
        // Automatically detect the installed React version
        version: "detect",
      },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
    },
    rules: {
      // React plugin configuration
      ...pluginReact.configs.recommended.rules,
      ...pluginA11y.configs.recommended.rules,
      ...pluginHooks.configs.recommended.rules,
      ...prettierConfig.rules,
      // Basic ESLint rules
      // Enforce double quotes
      quotes: ["error", "double"],
      // No semicolons
      semi: ["error", "never"],
      // Warn about undefined variables
      "no-undef": "warn",
      // Warn about unused variables
      "no-unused-vars": "warn",
      // Filename casing rule from unicorn plugin
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase", // Enforce kebab-case for file names
        },
      ],
      // No need to import React in JSX files
      "react/react-in-jsx-scope": "off",
      // No need to define prop types
      "react/prop-types": "off",
      "react/jsx-max-props-per-line": ["error", { maximum: 2 }],
      // Enforce parentheses around JSX return statements
      "react/jsx-wrap-multilines": ["error", { return: "parens-new-line" }],
    },
  },
]
