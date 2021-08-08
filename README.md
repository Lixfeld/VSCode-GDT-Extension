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
### Field identifiers and record types
**Select language and add custom descriptions or overwrite existing ones:**   
File -> Preferences -> Settings -> Extensions -> GDT  

**Tooltip descriptions**  
English and german tooltip descriptions for field identifiers and record types:  

![Tooltip_Screenshoot](https://github.com/Lixfeld/VSCode-GDT-Extension/raw/master/images/Tooltip.PNG)  

The descriptions should load and update automatically for GDT files but you can also run the command manually.  

**Display message**  
Show messsage with fields and descriptions in output channel:

![Output_channel_Screenshoot](https://github.com/Lixfeld/VSCode-GDT-Extension/raw/master/images/Output_channel.PNG)  

### Fix length of line
A command to change the length of line variables (first three digits) to the actual line length **(including whitespaces) + 2** (*CR LF*).
