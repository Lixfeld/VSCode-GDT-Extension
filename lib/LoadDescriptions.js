// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');

// Imports
const GermanDictionary = require('./GermanDictionary.js');
const EnglishDictionary = require('./EnglishDictionary.js');

// Constants
const GDT = 'gdt';
const Language = 'Language';
const German = 'German';
const RecordIdentification = '8000';

// Variables
var tooltipList = [];
var currentTooltip;

/**
 * Load descriptions (field and record types) and create tooltips 
 * @param {vscode.TextDocument} document 
 * @returns 
 */
function ShowTooltips(document) {
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
        var currentText = document.lineAt(lineIndex).text;
        var matches = regex.exec(currentText);

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
exports.ShowTooltips = ShowTooltips;