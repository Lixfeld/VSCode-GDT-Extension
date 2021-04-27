# GDT Language Support (**G**eräte-**D**aten-**T**räger)

Visual Studio Code extension for GDT files.

## Features
### Syntax highlighting

Different colors for GDT segments:  

![Syntax_highlighting_Screenshoot](https://github.com/Lixfeld/VSCode-GDT-Extension/raw/master/images/Syntax_highlighting.PNG)  

**Change colors and font styles:**  
Press `F1` and select `Preferences: Open Settings (Json)`.  
Add `"editor.tokenColorCustomizations"` with `"textMateRules"` and your desired colors and font styles for the different scopes.
([Official Documentation](https://code.visualstudio.com/docs/getstarted/themes#_editor-syntax-highlighting))

Available scopes:
- Length of line: `variable.gdt`
- Field identifier (default): `keyword.gdt`
- Field identifier (patient): `keyword.control.gdt`
- Record type: `constant.character.escape.gdt`
- Data content (default): `string.gdt`
- Data content (comment): `comment.gdt`

Example: 
```json
{
    "editor.tokenColorCustomizations": {
        "textMateRules": [
            {
                "scope": "variable.gdt",
                "settings": {
                    "foreground": "#4d4d4d"
                }
            },
            {
                "scope": "string.gdt",
                "settings": {
                    "fontStyle": "bold"
                }
            }
        ]
    }
}
```
### Tooltip descriptions
English and german tooltips descriptions for field and record types:  

![Tooltip_Screenshoot](https://github.com/Lixfeld/VSCode-GDT-Extension/raw/master/images/images/Tooltip.PNG)  

The descriptions should load and update automatically for GDT files but you can also run the command manually (`F1`).

**Select language:** File -> Preferences -> Settings -> Extensions -> GDT  
