<?php

/**
 * This file is part of nodeloc/flarum-ext-my-emoji.
 *
 * Copyright (c) 2021 Hasan Özbey
 *
 * LICENSE: For the full copyright and license information,
 * please view the LICENSE file that was distributed
 * with this source code.
 */

namespace Nodeloc\MyEmoji;

use Flarum\Extend;
use Nodeloc\MyEmoji\Api\Controllers;

return [
    (new Extend\Frontend('forum'))
        ->css(__DIR__.'/less/forum.less')
        ->js(__DIR__.'/js/dist/forum.js'),

    (new Extend\Frontend('admin'))
        ->css(__DIR__.'/less/admin.less')
        ->js(__DIR__.'/js/dist/admin.js'),

    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Formatter)
        ->configure(ConfigureTextFormatter::class),

    (new Extend\Routes('api'))
        ->get('/nodeloc/myemoji', 'myemoji.list', Controllers\ListEmojisController::class)
        ->post('/nodeloc/myemoji', 'myemoji.create', Controllers\CreateEmojiController::class)
        ->post('/nodeloc/import-myemoji', 'myemoji.import', Controllers\ImportEmojiController::class)
        ->patch('/nodeloc/myemoji/{id}', 'myemoji.update', Controllers\UpdateEmojiController::class)
        ->delete('/nodeloc/myemoji/{id}', 'myemoji.delete', Controllers\DeleteEmojiController::class),
];
