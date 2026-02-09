# Application Icons

Place your application icons in this directory:

- `icon.ico` - Windows icon (256x256px recommended)
- `icon.icns` - macOS icon (1024x1024px recommended)
- `icon.png` - Linux icon (512x512px recommended)

## Tools for generating icons

- **Windows**: Use GIMP or online ICO converters
- **macOS**: Use `iconutil` command or online converters
- **Linux**: PNG format works directly

You can generate all formats from a single high-resolution PNG (1024x1024px) using:
- [electron-icon-builder](https://www.npmjs.com/package/electron-icon-builder)
- [png-to-ico](https://www.npmjs.com/package/png-to-ico)

## Temporary

For development, Electron will use default icons. Replace these before production builds.
