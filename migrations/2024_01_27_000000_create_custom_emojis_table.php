<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if ($schema->hasTable('my_emoji')) {
            return;
        }

        $schema->create(
            'my_emoji',
            function (Blueprint $table) {
                $table->increments('id');
                $table->string('category')->nullable();
                $table->string('category_name')->nullable();
                $table->string('title')->nullable();
                $table->string('text_to_replace')->nullable();
                $table->string('path');
            }
        );
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('my_emoji');
    },
];
