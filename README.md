# MyEmoji

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/nodeloc/flarum-ext-my-emoji/blob/master/LICENSE) [![Latest Stable Version](https://img.shields.io/packagist/v/nodeloc/flarum-ext-my-emoji.svg)](https://packagist.org/packages/nodeloc/flarum-ext-my-emoji) [![Total Downloads](https://img.shields.io/packagist/dt/nodeloc/flarum-ext-my-emoji.svg)](https://packagist.org/packages/nodeloc/flarum-ext-my-emoji)

Simple emoji manager for Flarum. Modify from flamoji.



## Installation

```bash
composer require nodeloc/flarum-ext-my-emoji
```

## Updating

```bash
composer update nodeloc/flarum-ext-my-emoji
php flarum migrate
php flarum assets:publish
php flarum cache:clear
```

### Import and Export Configurations

I added these features so we can share our custom emoji configurations. Just use the "Export JSON" button from the extension's settings page to export your configuration and "Import JSON" button to import others. However, importing action will only import the configuration, not the image files. You still need to upload those images manually into your server.

## Links

- [Source code on GitHub](https://github.com/nodeloc/flarum-ext-my-emoji)
- [Changelog](https://github.com/nodeloc/blob/master/CHANGELOG.md)
- [Report an issue](https://github.com/nodeloc/flarum-ext-my-emoji/issues)
- [Download via Packagist](https://packagist.org/packages/nodeloc/flarum-ext-my-emoji)
