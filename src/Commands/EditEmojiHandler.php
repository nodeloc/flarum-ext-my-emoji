<?php

namespace Nodeloc\MyEmoji\Commands;

use Nodeloc\MyEmoji\Models\Emoji;
use Illuminate\Support\Arr;

class EditEmojiHandler
{
    /**
     * @param  EditEmoji $command
     * @return Emoji
     */
    public function handle(EditEmoji $command)
    {
        $data = $command->data;

        $emoji = Emoji::findOrFail($command->emojiId);

        $attributes = Arr::get($data, 'attributes', []);

        if (isset($attributes['category'])) {
            $emoji->title = $attributes['category'];
        }

        if (isset($attributes['category_name'])) {
            $emoji->title = $attributes['category_name'];
        }

        if (isset($attributes['title'])) {
            $emoji->title = $attributes['title'];
        }

        if (isset($attributes['textToReplace'])) {
            $emoji->text_to_replace = $attributes['textToReplace'];
        }

        if (isset($attributes['path'])) {
            $emoji->path = $attributes['path'];
        }

        $emoji->save();

        return $emoji;
    }
}
