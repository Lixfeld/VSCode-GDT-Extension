// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import * as LoadDescriptions from './lib/LoadDescriptions';
import * as FixLengthVariables from './lib/FixLengthVariables';
import * as DisplayMessage from './lib/DisplayMessage';

// Constants
const GDT = 'gdt';
const LoadDescriptionsCommand = 'gdt.LoadDescriptions';
const FixLengthVariablesCommand = 'gdt.FixLengthVariables';
const DisplayMessageCommand = 'gdt.DisplayMessage';

/**
* This method is called when your extension is activated
*/
export function activate(context: vscode.ExtensionContext) {
	console.log('Activating GDT extension');

	// Register commands:
	let displayMessageCommand = vscode.commands.registerCommand(DisplayMessageCommand, function () {
		console.log('DisplayMessageCommand called');
		let document = GetActiveGdtDocument();
		if (document)
			DisplayMessage.ShowOutput(document);
	});
	context.subscriptions.push(displayMessageCommand);

	let fixLengthVariablesCommand = vscode.commands.registerCommand(FixLengthVariablesCommand, function () {
		console.log('FixLengthVariablesCommand called');
		let document = GetActiveGdtDocument();
		if (document)
			FixLengthVariables.ShowResult(document);
	});
	context.subscriptions.push(fixLengthVariablesCommand);

	let loadDescriptionsCommand = vscode.commands.registerCommand(LoadDescriptionsCommand, function () {
		console.log('LoadDescriptionsCommand called');
		let document = GetActiveGdtDocument();
		if (document)
			LoadDescriptions.ShowTooltips(document);
	});
	context.subscriptions.push(loadDescriptionsCommand);

	// Event: ActiveTextEditor changed
	vscode.window.onDidChangeActiveTextEditor(function () {
		console.log('ActiveTextEditor changed')
		let document = GetActiveGdtDocument();
		if (document)
			LoadDescriptions.ShowTooltips(document);
	}, null, context.subscriptions);

	// Event: TextDocument changed
	vscode.workspace.onDidChangeTextDocument(function (event) {
		console.log('TextDocument changed')
		let document = GetActiveGdtDocument();
		if (document && event.document === document)
			LoadDescriptions.ShowTooltips(document);
	}, null, context.subscriptions);

	// Start:
	let document = GetActiveGdtDocument();
	if (document)
		LoadDescriptions.ShowTooltips(document);

	/**
	 * Get TextDocument with GDT LanguageID
	 */
	function GetActiveGdtDocument(): vscode.TextDocument | undefined {
		let activeTextEditor = vscode.window.activeTextEditor;
		if (activeTextEditor && activeTextEditor.document.languageId == GDT)
			return activeTextEditor.document;
		else
			return undefined;
	}
}

/**
 * This method is called when your extension is deactivated
 */
export function deactivate() {
	console.log('Deactivating GDT extension');
}