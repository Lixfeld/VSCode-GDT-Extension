// The module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';
import * as GermanDictionary from './GermanDictionary';
import * as EnglishDictionary from './EnglishDictionary';
import * as LdtDictionary from './LdtDictionary';
import * as KvdtDictionary from './KvdtDictionary';

// Constants
const GDT = 'gdt';
const LDT = 'ldt';
const KVDT = 'kvdt';
const German = 'German';
const Language = 'Language';
const CustomRecordTypes = 'CustomRecordTypes';
const CustomFieldIdentifiers = 'CustomFieldIdentifiers';
export const RecordIdentification = '8000';
export const SupportedLanguageIds = [GDT, LDT, KVDT];

interface LanguageDictionary {
    recordTypes: {[key: string]: string};
    fieldIdentifiers: {[key: string]: string};
}

/**
 * Try get field type description for the selected language and file type (gdt, ldt, kvdt)
 */
export function GetFieldTypeDescription(key: string, languageId: string = GDT): string | undefined {
    let customFieldIdentifiers = vscode.workspace.getConfiguration(GDT)[CustomFieldIdentifiers];
    if (customFieldIdentifiers && customFieldIdentifiers[key] !== undefined)
        return customFieldIdentifiers[key];

    for (const dictionary of GetDictionaries(languageId)) {
        let description = dictionary.fieldIdentifiers[key];
        if (description !== undefined)
            return description;
    }
    return undefined;
}

/**
 * Try get record type description for the selected language and file type (gdt, ldt, kvdt)
 */
export function GetRecordTypeDescription(key: string, languageId: string = GDT): string | undefined {
    let customRecordTypes = vscode.workspace.getConfiguration(GDT)[CustomRecordTypes];
    if (customRecordTypes && customRecordTypes[key] !== undefined)
        return customRecordTypes[key];

    for (const dictionary of GetDictionaries(languageId)) {
        let description = dictionary.recordTypes[key];
        if (description !== undefined)
            return description;
    }
    return undefined;
}

/**
 * Get dictionaries in lookup order.
 * LDT and KVDT descriptions exist in German only (no official English terms).
 * GDT 3.5 refers to the LDT field table, so LDT is used as fallback for GDT files.
 */
function GetDictionaries(languageId: string): LanguageDictionary[] {
    switch (languageId) {
        case LDT:
            return [LdtDictionary];
        case KVDT:
            return [KvdtDictionary];
        default:
            return [GetGdtDictionary(), LdtDictionary];
    }
}

/**
 * Get GDT dictionary for the selected language
 */
function GetGdtDictionary(): LanguageDictionary {
    const language: string = vscode.workspace.getConfiguration(GDT)[Language];
    if (language == German)
        return GermanDictionary;
    else
        return EnglishDictionary;
}
