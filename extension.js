const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    console.log('SwitchBase extension is now active!');

    // Convert to Binary
    let toBinary = vscode.commands.registerCommand('switchbase.convertToBinary', function () {
        convertBase(2);
    });

    // Convert to Decimal
    let toDecimal = vscode.commands.registerCommand('switchbase.convertToDecimal', function () {
        convertBase(10);
    });

    // Convert to Hex
    let toHex = vscode.commands.registerCommand('switchbase.convertToHex', function () {
        convertBase(16);
    });

    context.subscriptions.push(toBinary, toDecimal, toHex);
}

/**
 * Convert selected number to specified base
 * @param {number} targetBase - The base to convert to (2, 10, or 16)
 */
function convertBase(targetBase) {
    const editor = vscode.window.activeTextEditor;
    
    if (!editor) {
        vscode.window.showErrorMessage('No active editor found!');
        return;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection).trim();

    if (!selectedText) {
        vscode.window.showWarningMessage('Please select a number first!');
        return;
    }

    try {
        // Parse number with format detection and suffix preservation
        const parseResult = parseNumberWithFormat(selectedText);
        
        if (!parseResult.isValid) {
            vscode.window.showErrorMessage(`"${selectedText}" is not a valid number!`);
            return;
        }

        // Convert to target base with preserved suffixes
        const result = formatNumberWithSuffix(parseResult.number, targetBase, parseResult.suffix);

        // Replace the selected text with the converted value
        editor.edit(editBuilder => {
            editBuilder.replace(selection, result);
        });

    } catch (error) {
        vscode.window.showErrorMessage(`Error converting number: ${error.message}`);
    }
}

/**
 * Parse a number string and extract the numeric value and format suffixes
 * @param {string} text - The input text to parse
 * @returns {object} - Object containing number, suffix, and validity
 */
function parseNumberWithFormat(text) {
    // Regex to match number with optional prefix and suffix
    // Supports: 0x1A, 0b101, 123, 42u, 0xFF1234UL, etc.
    const numberRegex = /^(0[xX]|0[bB])?([0-9a-fA-F]+)([ulULfFdD]*)$/;
    const match = text.match(numberRegex);
    
    if (!match) {
        return { isValid: false };
    }

    const [, prefix, numberPart, suffix] = match;
    let number;
    
    if (prefix && (prefix.toLowerCase() === '0x')) {
        // Hexadecimal
        number = parseInt(numberPart, 16);
    } else if (prefix && (prefix.toLowerCase() === '0b')) {
        // Binary
        number = parseInt(numberPart, 2);
    } else {
        // Decimal (also handles hex digits in decimal context)
        // Check if it contains hex digits (a-f) without 0x prefix
        if (/[a-fA-F]/.test(numberPart)) {
            // Assume hexadecimal if contains hex digits
            number = parseInt(numberPart, 16);
        } else {
            number = parseInt(numberPart, 10);
        }
    }

    return {
        isValid: !isNaN(number),
        number: number,
        suffix: suffix || ''
    };
}

/**
 * Format a number in the target base with preserved suffix
 * @param {number} number - The number to format
 * @param {number} targetBase - Target base (2, 10, or 16)
 * @param {string} suffix - Original suffix to preserve
 * @returns {string} - Formatted number string
 */
function formatNumberWithSuffix(number, targetBase, suffix) {
    let result;
    
    switch (targetBase) {
        case 2:
            result = '0b' + number.toString(2);
            break;
        case 10:
            result = number.toString(10);
            break;
        case 16:
            result = '0x' + number.toString(16).toUpperCase();
            break;
        default:
            throw new Error('Invalid base');
    }

    return result + suffix;
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
