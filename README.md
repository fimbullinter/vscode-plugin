# Wotan

Adds the [Fimbullinter](https://github.com/fimbullinter/wotan) to VSCode.

The linter is configured by a `.wotanrc.yaml` file in your workspace. Please refer to the [documentation](https://github.com/fimbullinter/wotan/blob/master/packages/wotan/README.md#configuration) for more details about the configuration.

A list of available core rules can be found [here](https://github.com/fimbullinter/wotan/blob/master/packages/mimir/README.md#rules).

## Features

This extension provides real-time linting while you type by adding Fimbullinter as LanguageService Plugin to TypeScript for all languages powered by the TypeScript services.

You only need this extension if you use the version of TypeScript that comes bundled with VSCode. If you use the workspace version of TypeScript, you can use [`@fimbul/mithotyn`](https://github.com/fimbullinter/wotan/blob/master/packages/mithotyn/README.md) directly in `tsconfig.json`.

## Requirements

To correctly configure the plugin you need at least `vscode@^1.30.0` and `typescript@^3.2.1`.

## Extension Settings

This extension uses the same configuration options as [`@fimbul/mithotyn`](https://github.com/fimbullinter/wotan/blob/master/packages/mithotyn/README.md#configuration-options).

If you don't add any configuration through VSCode it uses the plugin config from your `tsconfig.json`.

This extension has the following settings:

* `wotan.displayErrorsAsWarnings`: Display errors as warnings to get green squiggles instead of red. This doesn't affect other severities.
