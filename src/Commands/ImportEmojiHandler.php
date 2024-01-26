<?php

namespace Nodeloc\MyEmoji\Commands;

use Nodeloc\MyEmoji\Models\Emoji;
use Illuminate\Support\Arr;

class ImportEmojiHandler
{
    /**
     * @param  ImportEmoji $command
     * @return Emoji
     */
    public function handle(ImportEmoji $command)
    {
        $data = $command->data;
        $emoji = null;

        foreach ($data as $emojiData) {
            $emoji = Emoji::build(
                Arr::get($emojiData, 'category'),
                Arr::get($emojiData, 'category_name'),
                Arr::get($emojiData, 'title'),
                Arr::get($emojiData, 'text_to_replace'),
                Arr::get($emojiData, 'path')
            );

            $emoji->save();
        }

        return $emoji;
    }
}
