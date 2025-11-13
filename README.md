# SwitchBase

🔢 Convert numbers between different bases with a simple right-click!

## Features

✨ **Smart Base Conversion**
- Convert between decimal, binary (base 2), and hexadecimal (base 16)
- Automatic base detection (0x for hex, 0b for binary)
- **Format preservation** - keeps suffixes like `u`, `UL`, `f`, `d`

🎯 **Easy to Use**
- Select any number in your code
- Right-click to access conversion menu
- Silent operation - no annoying success messages

## Usage

1. **Select** a number in your editor
2. **Right-click** to open context menu
3. **Choose** SwitchBase → desired conversion:
   - Convert to Binary (base 2)
   - Convert to Decimal (base 10)
   - Convert to Hexadecimal (base 16)

## Examples

### Basic Conversions
- `255` → `0xFF` (decimal to hex)
- `0xFF` → `0b11111111` (hex to binary)
- `0b1010` → `10` (binary to decimal)

### Format Preservation
- `16u` → `0x10u` (keeps unsigned suffix)
- `255UL` → `0b11111111UL` (keeps unsigned long suffix)
- `0x2Au` → `42u` (preserves suffix in decimal)

### Supported Formats
- **Prefixes**: `0x`, `0X` (hex), `0b`, `0B` (binary)
- **Suffixes**: `u`, `U`, `l`, `L`, `ul`, `UL`, `f`, `F`, `d`, `D`

## Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "SwitchBase"
4. Click Install

## Release Notes

### 1.0.0

- Smart number format detection and preservation
- Support for programming language suffixes (u, UL, f, etc.)
- Grouped menu for cleaner context menu
- Silent operation mode
- Enhanced error handling

---

**Enjoy converting! 🚀**
