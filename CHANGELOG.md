# Change Log

All notable changes to the "gdt" extension will be documented in this file.

## Unreleased
- New languages: LDT (`.ldt`, LDT 3.2.20) and KVDT (`.con`, KVDT 6.09 container + ADT) with German field and record type descriptions
- GDT 3.5: new field identifiers 0001, 8112, 8133, 8157; unknown GDT fields fall back to the LDT field table
- Tooltips for alphanumeric record types (e.g. `con0`, `adt0`), syntax highlighting for all record types
- Default encoding ISO 8859-15 and CR LF for GDT/LDT/KVDT files
- Fix: tooltips were created for unknown field identifiers (`typeof description !== undefined` was always true)

## 2.0.0
- New Option: Add custom field identifiers and record types
- Converting existing JavaScript to TypeScript

## 1.2.1
- Fix: Display message (command) with non-default field types
- Add german header for message output

## 1.2.0
- New command: Output message with fields and descriptions
- New command: Fix length of line variables

## 1.1.0
- Add german and english descriptions for field and record types
- Add tooltips and configuration *(select language)*

## 1.0.0
- Initial release
