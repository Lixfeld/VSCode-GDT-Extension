// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');

// Imports
const LanguageDictionary = require('./LanguageDictionary.js');

/**
 * Show formatted message with descriptions in output channel
 * @param {vscode.TextDocument} document 
 */
function ShowOutput(document) {
    if (!document)
        return;

    var fieldTypes = [];
    var descriptions = [];
    var contents = [];

    // Search all lines for fields and content/record type
    var regex = new RegExp('^\\d{3}(\\d{4})(.*)$');
    for (lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
        var currentText = document.lineAt(lineIndex).text;
        var matches = regex.exec(currentText);

        if (matches != null) {
            var fieldType = matches[1];
            fieldTypes.push(fieldType);
            var description = LanguageDictionary.GetFieldTypeDescription(fieldType);
            if (description === undefined)
                description = '';

            descriptions.push(description);

            // Content / Record type + description
            var content = matches[2];
            if (fieldType == LanguageDictionary.RecordIdentification) {
                recordDescription = LanguageDictionary.GetRecordTypeDescription(content);
                if (recordDescription !== undefined)
                    content = content + ` (${recordDescription})`;
            }
            contents.push(content);
        }
    }
    Print(fieldTypes, descriptions, contents);
}

/**
 * Print lines to output channel
 * @param {Array<string>} fieldTypes 
 * @param {Array<string>} descriptions 
 * @param {Array<string>} contents 
 */
function Print(fieldTypes, descriptions, contents) {
    var outputChannel = vscode.window.createOutputChannel('GDT Message');
    outputChannel.clear();

    // Get max length to align contents
    var maxDescriptionLength = GetMaxLength(descriptions) + 3;
    var padding = ' '.repeat(maxDescriptionLength - 'Description'.length);
    outputChannel.appendLine('Field   Description' + padding + 'Content\n');

    for (index = 0; index < fieldTypes.length; index++) {
        var description = descriptions[index];
        // Add individual padding to each description
        description = description + ' '.repeat(maxDescriptionLength - description.length);
        outputChannel.appendLine(fieldTypes[index] + '    ' + description + contents[index]);
    }
    outputChannel.show();
}

/**
 * Get length of longest string in array
 * @param {Array<string>} stringArray 
 * @returns {Number} length
 */
function GetMaxLength(stringArray) {
    var maxLength = 0;
    for (index = 0; index < stringArray.length; index++) {
        maxLength = Math.max(stringArray[index].length, maxLength);
    }
    return maxLength;
}

exports.ShowOutput = ShowOutput;