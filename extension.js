// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');

// Imports
const GermanDictionary = require('./lib/GermanDictionary.js');
const EnglishDictionary = require('./lib/EnglishDictionary.js');

// Constants
const GDT = 'gdt';
const Language = 'Language';
const German = 'German';
const LoadDescriptionsCommand = 'gdt.LoadDescriptions';
const RecordIdentification = '8000';

// Variables
var workspace = vscode.workspace;
var tooltipList = [];
var currentTooltip;

/**
* This method is called when your extension is activated
* @param {vscode.ExtensionContext} context
*/
function activate(context) {
	console.log('Activating GDT extension');

	// Register command
	var loadDescriptionsCommand = vscode.commands.registerCommand(LoadDescriptionsCommand, function () {
		console.log('LoadDescriptionsCommand called');
		var document = GetActiveGdtDocument();
		LoadDescriptions(document);
	});
	context.subscriptions.push(loadDescriptionsCommand);

	// Event: ActiveTextEditor changed
	vscode.window.onDidChangeActiveTextEditor(function (editor) {
		console.log('ActiveTextEditor changed')
		var document = GetActiveGdtDocument();
		LoadDescriptions(document);
	}, null, context.subscriptions);

	// Event: TextDocument changed
	workspace.onDidChangeTextDocument(function (event) {
		console.log('TextDocument changed')
		var document = GetActiveGdtDocument();
		if (document && event.document === document)
			LoadDescriptions(document);
	}, null, context.subscriptions);

	// Start:
	var document = GetActiveGdtDocument();
	LoadDescriptions(document);

	/**
	 * Get TextDocument with GDT LanguageID
	 * @returns {vscode.TextDocument} document
	 */
	function GetActiveGdtDocument() {
		var activeTextEditor = vscode.window.activeTextEditor;
		if (activeTextEditor && activeTextEditor.document.languageId == GDT)
			return activeTextEditor.document;
	}

	/**
	 * Load descriptions (field and record types) and create tooltips 
	 * @param {vscode.TextDocument} document 
	 * @returns 
	 */
	function LoadDescriptions(document) {
		if (!document)
			return;

		// Dispose old tooltips
		if (tooltipList.length > 0) {
			currentTooltip.dispose();
			tooltipList = [];
		}

		// Search all lines for field and record types 
		var regex = new RegExp('^\\d{3}(\\d{4})(\\d{4})?');
		for (lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
			var currentTextLine = document.lineAt(lineIndex).text;
			var matches = regex.exec(currentTextLine);

			if (matches != null) {
				var fieldType = matches[1];
				AddFieldTooltip(fieldType, lineIndex);

				if (fieldType == RecordIdentification) {
					var recordType = matches[2];
					AddRecordTooltip(recordType, lineIndex);
				}
			}
		}
		// Apply decorations 
		var decorationType = vscode.window.createTextEditorDecorationType({});
		vscode.window.activeTextEditor.setDecorations(decorationType, tooltipList);
		currentTooltip = decorationType;
	}

	/**
	 * Add tooltip for field if type exists in dictionary
	 * @param {string} fieldType 
	 * @param {number} lineIndex 
	 */
	function AddFieldTooltip(fieldType, lineIndex) {
		var description = GetFieldTypeDescription(fieldType);
		if (typeof description !== undefined) {
			var startPos = new vscode.Position(lineIndex, 3);
			var endPos = new vscode.Position(lineIndex, 7);

			var tooltip = { range: new vscode.Range(startPos, endPos), hoverMessage: description };
			tooltipList.push(tooltip);
		}
	}

	/**
	 * Add tooltip for record if type exists in dictionary
	 * @param {string} recordType 
	 * @param {number} lineIndex 
	 */
	function AddRecordTooltip(recordType, lineIndex) {
		var description = GetRecordTypeDescription(recordType);
		if (typeof description !== undefined) {
			var startPos = new vscode.Position(lineIndex, 7);
			var endPos = new vscode.Position(lineIndex, 11);

			var tooltip = { range: new vscode.Range(startPos, endPos), hoverMessage: description };
			tooltipList.push(tooltip);
		}
	}

	/**
	 * Try get field type description for the selected language
	 * @param {string} key 
	 * @returns {string} Description
	 */
	function GetFieldTypeDescription(key) {
		var languageDictionary = GetLanguageDictionary();
		var fieldTypes = languageDictionary.fieldTypes;
		return fieldTypes[key];
	}

	/**
	 * Try get record type description for the selected language
	 * @param {string} key 
	 * @returns {string} Description
	 */
	function GetRecordTypeDescription(key) {
		var languageDictionary = GetLanguageDictionary();
		var recordTypes = languageDictionary.recordTypes;
		return recordTypes[key];
	}

	/**
	 * Get Dictionary with field and record type descriptions for the selected language
	 * @returns LanguageDictionary
	 */
	function GetLanguageDictionary() {
		var language = vscode.workspace.getConfiguration(GDT)[Language];
		if (language == German)
			return GermanDictionary;
		else
			return EnglishDictionary;
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