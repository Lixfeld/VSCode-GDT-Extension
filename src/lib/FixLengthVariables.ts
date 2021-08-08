// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';

/**
 * Fix length of line variables and show result
 */
export function ShowResult(document: vscode.TextDocument) {
    if (!document)
        return;

    // Check all lines for invalid line length variable 
    let textEdits: vscode.TextEdit[] = [];
    const regex = new RegExp('^(\\d{3})\\d{4}');
    for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
        let currentTextLine = document.lineAt(lineIndex);
        let currentText = currentTextLine.text;
        let matches = regex.exec(currentText);

        if (matches != null) {
            let length = ConvertIntegerToString(currentText.length + 2); //<CR><LF> = 2
            if (matches[1] !== length) {
                // Add new/valid line length and keep original text
                let newText = length + currentText.substring(3);
                textEdits.push(new vscode.TextEdit(currentTextLine.range, newText));
            }
        }
    }

    // Apply changes
    if (textEdits.length >= 1) {
        const workEdits = new vscode.WorkspaceEdit();
        workEdits.set(document.uri, textEdits);
        vscode.workspace.applyEdit(workEdits);
        vscode.window.showInformationMessage(textEdits.length + ' line lenghts were changed.');
    }
    else {
        vscode.window.showInformationMessage('No lines lenghts were changed (all valid).');
    }
}

/**
 * Convert number to string with two leading zeros
 */
function ConvertIntegerToString(number: number) {
    if (number < 10)
        return '00' + number;
    else if (number < 100)
        return '0' + number;
    else
        return '' + number;
}