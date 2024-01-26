<?php

namespace Nodeloc\MyEmoji\Commands;

use Nodeloc\MyEmoji\Models\Emoji;
use Illuminate\Support\Arr;

class CreateEmojiHandler
{
    /**
     * @param  CreateEmoji $command
     * @return Emoji
     */
    public function handle(CreateEmoji $command)
    {
        $data = $command->data;

        $emoji = Emoji::build(
            Arr::get($data, 'attributes.category'),
            Arr::get($data, 'attributes.category_name'),
            Arr::get($data, 'attributes.title'),
            Arr::get($data, 'attributes.textToReplace'),
            Arr::get($data, 'attributes.path')
        );

        $emoji->save();

        return $emoji;
    }
}
