<?php

namespace Nodeloc\MyEmoji\Commands;

use Nodeloc\MyEmoji\Models\Emoji;

class DeleteEmojiHandler
{
    /**
     * @param  DeleteEmoji $command
     * @return Emoji
     */
    public function handle(DeleteEmoji $command)
    {
        $emoji = Emoji::findOrFail($command->tagId);

        $emoji->delete();

        return $emoji;
    }
}
