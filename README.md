# MyEmoji

[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/nodeloc/flarum-ext-my-emoji/blob/master/LICENSE) [![Latest Stable Version](https://img.shields.io/packagist/v/nodeloc/flarum-ext-my-emoji.svg)](https://packagist.org/packages/nodeloc/flarum-ext-my-emoji) [![Total Downloads](https://img.shields.io/packagist/dt/nodeloc/flarum-ext-my-emoji.svg)](https://packagist.org/packages/nodeloc/flarum-ext-my-emoji)

Simple emoji manager for Flarum.

Screenshots:

<img width="709" alt="3" src="https://github.com/nodeloc/flarum-ext-my-emoji/assets/149086144/7f7d0129-0a12-4239-92b8-597acd0a2914">

<img width="311" alt="4" src="https://github.com/nodeloc/flarum-ext-my-emoji/assets/149086144/27e4ad8a-1d3f-4bc5-99ca-c3b4871d344a">


## Features

- Based on [joeattardi/emoji-button](https://github.com/joeattardi/emoji-button) repository.
- Add an emoji picker to the text editor (compatible with dark mode).
- Show Twemoji or unicode myemoji in the picker.
- Search myemoji in your own language.
- Add custom myemoji to the picker.
- Import and export custom emoji configurations.
- Everything is dynamically loaded (no CDNs) when the picker is opened (there should be no performance impact until the user interacts with the picker).

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
