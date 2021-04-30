// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');

// Imports
const LoadDescriptions = require('./lib/LoadDescriptions.js');
const FixLengthVariables = require('./lib/FixLengthVariables.js');

// Constants
const GDT = 'gdt';
const LoadDescriptionsCommand = 'gdt.LoadDescriptions';
const FixLengthVariablesCommand = 'gdt.FixLengthVariables';

// Variables
var workspace = vscode.workspace;

/**
* This method is called when your extension is activated
* @param {vscode.ExtensionContext} context
*/
function activate(context) {
	console.log('Activating GDT extension');

	// Register commands:
	var fixLengthVariablesCommand = vscode.commands.registerCommand(FixLengthVariablesCommand, function () {
		console.log('FixLengthVariablesCommand called');
		var document = GetActiveGdtDocument();
		FixLengthVariables.ShowResult(document);
	});
	context.subscriptions.push(fixLengthVariablesCommand);

	var loadDescriptionsCommand = vscode.commands.registerCommand(LoadDescriptionsCommand, function () {
		console.log('LoadDescriptionsCommand called');
		var document = GetActiveGdtDocument();
		LoadDescriptions.ShowTooltips(document);
	});
	context.subscriptions.push(loadDescriptionsCommand);

	// Event: ActiveTextEditor changed
	vscode.window.onDidChangeActiveTextEditor(function (editor) {
		console.log('ActiveTextEditor changed')
		var document = GetActiveGdtDocument();
		LoadDescriptions.ShowTooltips(document);
	}, null, context.subscriptions);

	// Event: TextDocument changed
	workspace.onDidChangeTextDocument(function (event) {
		console.log('TextDocument changed')
		var document = GetActiveGdtDocument();
		if (document && event.document === document)
			LoadDescriptions.ShowTooltips(document);
	}, null, context.subscriptions);

	// Start:
	var document = GetActiveGdtDocument();
	LoadDescriptions.ShowTooltips(document);

	/**
	 * Get TextDocument with GDT LanguageID
	 * @returns {vscode.TextDocument} document
	 */
	function GetActiveGdtDocument() {
		var activeTextEditor = vscode.window.activeTextEditor;
		if (activeTextEditor && activeTextEditor.document.languageId == GDT)
			return activeTextEditor.document;
	}
}
exports.activate = activate;

/**
 * This method is called when your extension is deactivated
 */
function deactivate() {
	console.log('Deactivating GDT extension');
	exports.deactivate = deactivate;
}