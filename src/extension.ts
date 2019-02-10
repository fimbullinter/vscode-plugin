import * as vscode from "vscode";

const configNamespace = "wotan";
const configOptions = ["displayErrorsAsWarnings"];

export async function activate(context: vscode.ExtensionContext) {
    // Get the TS extension
    const tsExtension = vscode.extensions.getExtension(
        "vscode.typescript-language-features"
    );
    if (!tsExtension) {
        return;
    }

    await tsExtension.activate();

    // Get the API from the TS extension
    if (!tsExtension.exports || !tsExtension.exports.getAPI) {
        return;
    }

    const api = tsExtension.exports.getAPI(0);
    if (!api) {
        return;
    }

    vscode.workspace.onDidChangeConfiguration(
        e => {
            if (e.affectsConfiguration(configNamespace)) {
                syncConfig(api);
            }
        },
        undefined,
        context.subscriptions,
    );

    syncConfig(api);
}

function syncConfig(api: {
    configurePlugin(name: string, config: Record<string, unknown>): void;
}) {
    const config = mapConfig(vscode.workspace.getConfiguration(configNamespace));
    if (config) {
        api.configurePlugin(
            "@fimbul/mithotyn",
            config,
        );
    }
}

function mapConfig(config: vscode.WorkspaceConfiguration) {
    let result: Record<string, unknown> | undefined;

    for (const optionName of configOptions) {
        const option = config.inspect<unknown>(optionName);
        if (!option) {
            continue;
        }
        if (
            option.globalValue === undefined &&
            option.workspaceFolderValue === undefined &&
            option.workspaceValue === undefined
        ) {
            continue;
        }
        const value = config.get<unknown>(optionName);
        if (value === undefined) {
            continue;
        }
        (result || (result = {}))[optionName] = value;
    }

    return result;
}
