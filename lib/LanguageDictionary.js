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

exports.GetFieldTypeDescription = GetFieldTypeDescription;
exports.GetRecordTypeDescription = GetRecordTypeDescription;
exports.RecordIdentification = RecordIdentification;