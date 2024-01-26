<?php

namespace Nodeloc\MyEmoji\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use Nodeloc\MyEmoji\Models\Emoji;

class EmojiSerializer extends AbstractSerializer
{
    protected $type = 'myemoji';

    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param Emoji $model
     *
     * @return array
     */
    protected function getDefaultAttributes($model)
    {
        return [
            'title'            => $model->title,
            'text_to_replace'  => $model->text_to_replace,
            'path'             => $model->path,
            'category'        => $model->category,
            'category_name'        => $model->category_name,
        ];
    }
}
