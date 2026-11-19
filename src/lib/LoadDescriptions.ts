// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import * as LanguageDictionary from './LanguageDictionary';

// Variables
let tooltipList: vscode.DecorationOptions[] = [];
let currentTooltip: vscode.TextEditorDecorationType;

/**
 * Load descriptions (field and record types) and create tooltips 
 */
export function ShowTooltips(document: vscode.TextDocument) {
    if (!document)
        return;

    // Dispose old tooltips
    if (tooltipList.length > 0) {
        currentTooltip.dispose();
        tooltipList = [];
    }

    // Search all lines for field and record types 
    const regex = new RegExp('^\\d{3}(\\d{4})(\\w{4,5})?');
    for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
        let currentText = document.lineAt(lineIndex).text;
        let matches = regex.exec(currentText);

        if (matches != null) {
            let fieldType = matches[1];
            AddFieldTooltip(fieldType, lineIndex, document.languageId);

            if (fieldType == LanguageDictionary.RecordIdentification) {
                let recordType = matches[2];
                AddRecordTooltip(recordType, lineIndex, document.languageId);
            }
        }
    }
    // Apply decorations 
    let decorationType = vscode.window.createTextEditorDecorationType({});
    vscode.window.activeTextEditor?.setDecorations(decorationType, tooltipList);
    currentTooltip = decorationType;
}

/**
 * Add tooltip for field if type exists in dictionary
 */
function AddFieldTooltip(fieldType: string, lineIndex: number, languageId: string) {
    let description = LanguageDictionary.GetFieldTypeDescription(fieldType, languageId);
    if (description !== undefined) {
        let startPos = new vscode.Position(lineIndex, 3);
        let endPos = new vscode.Position(lineIndex, 7);

        let tooltip: vscode.DecorationOptions = { range: new vscode.Range(startPos, endPos), hoverMessage: description };
        tooltipList.push(tooltip);
    }
}

/**
 * Add tooltip for record if type exists in dictionary
 */
function AddRecordTooltip(recordType: string, lineIndex: number, languageId: string) {
    let description = LanguageDictionary.GetRecordTypeDescription(recordType, languageId);
    if (description !== undefined) {
        let startPos = new vscode.Position(lineIndex, 7);
        let endPos = new vscode.Position(lineIndex, 7 + recordType.length);

        let tooltip = { range: new vscode.Range(startPos, endPos), hoverMessage: description };
        tooltipList.push(tooltip);
    }
}