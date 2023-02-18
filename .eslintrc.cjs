module.exports = {
  root: true,
  extends: ["eslint-config-react-app", "plugin:import/typescript", "eslint-config-prettier"],
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: __dirname,
      },
    },
  },
  parserOptions: {
    project: ["./tsconfig.json", "./tsconfig.node.json"],
  },
  rules: {
    "no-console": [
      "warn",
      {
        allow: ["warn", "error", "time", "timeEnd"],
      },
    ],
    "import/no-useless-path-segments": [
      "error",
      {
        noUselessIndex: true,
      },
    ],
    "import/exports-last": "error",
    "import/no-duplicates": "error",
    "import/order": [
      "error",
      {
        groups: [["builtin", "external"], ["internal"], ["parent", "sibling", "index"], ["object", "type"], "unknown"],
        pathGroups: [
          {
            pattern: "./**.css",
            group: "unknown",
          },
        ],
        "newlines-between": "always",
        warnOnUnassignedImports: true,
      },
    ],
    "import/newline-after-import": ["error", { count: 1 }],
    "import/no-default-export": "error",
  },
};
