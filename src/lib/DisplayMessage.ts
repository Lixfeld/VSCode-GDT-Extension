// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import * as LanguageDictionary from './LanguageDictionary';

// Constants
const GDT = 'gdt';
const Language = 'Language';
const German = 'German';

/**
 * Show formatted message with descriptions in output channel
 */
export function ShowOutput(document: vscode.TextDocument): void {
    if (!document)
        return;

    let fieldIdentifiers: string[] = [];
    let descriptions: string[] = [];
    let contents: string[] = [];

    // Search all lines for fields and content/record type
    const regex = new RegExp('^\\d{3}(\\d{4})(.*)$');
    for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex++) {
        let currentText = document.lineAt(lineIndex).text;
        let matches = regex.exec(currentText);

        if (matches != null) {
            let fieldType = matches[1];
            fieldIdentifiers.push(fieldType);
            let description = LanguageDictionary.GetFieldTypeDescription(fieldType);
            if (description === undefined)
                description = '';

            descriptions.push(description);

            // Content / Record type + description
            let content = matches[2];
            if (fieldType == LanguageDictionary.RecordIdentification) {
                let recordDescription = LanguageDictionary.GetRecordTypeDescription(content);
                if (recordDescription !== undefined)
                    content = content + ` (${recordDescription})`;
            }
            contents.push(content);
        }
    }
    Print(fieldIdentifiers, descriptions, contents);
}

/**
 * Print lines to output channel
 */
function Print(fieldIdentifiers: string[], descriptions: string[], contents:string[]): void {
    const outputChannel = vscode.window.createOutputChannel('GDT Message');
    outputChannel.clear();

    // Get max length to align contents
    let maxDescriptionLength: number = GetMaxLength(descriptions) + 3;
    // Append header for selected language
    outputChannel.appendLine(GetLanguageHeader(maxDescriptionLength));

    for (let index = 0; index < fieldIdentifiers.length; index++) {
        let description = descriptions[index];
        // Add individual padding to each description
        description = description + ' '.repeat(maxDescriptionLength - description.length);
        outputChannel.appendLine(fieldIdentifiers[index] + '    ' + description + contents[index]);
    }
    outputChannel.show();
}

/**
 * Get header for selected language
 */
 function GetLanguageHeader(maxDescriptionLength: number): string {
    let language: string = vscode.workspace.getConfiguration(GDT)[Language];
    if (language == German) {
        let padding = ' '.repeat(maxDescriptionLength - 'Beschreibung'.length);
        return 'Feld    Beschreibung' + padding + 'Inhalt\n';
    }
    else {
        let padding = ' '.repeat(maxDescriptionLength - 'Description'.length);
        return 'Field   Description' + padding + 'Content\n';
    }
 }

/**
 * Get length of longest string in array
 */
function GetMaxLength(stringArray: string[]): number {
    let maxLength = 0;
    for (let index = 0; index < stringArray.length; index++) {
        maxLength = Math.max(stringArray[index].length, maxLength);
    }
    return maxLength;
}