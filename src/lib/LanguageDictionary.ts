// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import * as GermanDictionary from './GermanDictionary';
import * as EnglishDictionary from './EnglishDictionary';

// Constants
const GDT = 'gdt';
const German = 'German';
const Language = 'Language';
export const RecordIdentification = '8000';

interface LanguageDictionary {
    recordTypes: {[key: string]: string};
    fieldIdentifiers: {[key: string]: string};
}

/**
 * Try get field type description for the selected language
 */
export function GetFieldTypeDescription(key: string): string {
    let languageDictionary = GetLanguageDictionary();
    let fieldIdentifiers = languageDictionary.fieldIdentifiers;
    return fieldIdentifiers[key];
}

/**
 * Try get record type description for the selected language
 */
 export function GetRecordTypeDescription(key: string): string {
    let languageDictionary = GetLanguageDictionary();
    let recordTypes = languageDictionary.recordTypes;
    return recordTypes[key];
}

/**
 * Get Dictionary with field and record type descriptions for the selected language
 */
function GetLanguageDictionary(): LanguageDictionary {
    const language: string = vscode.workspace.getConfiguration(GDT)[Language];
    if (language == German)
        return GermanDictionary;
    else
        return EnglishDictionary;
}

