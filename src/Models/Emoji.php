<?php

namespace Nodeloc\MyEmoji\Models;

use Flarum\Database\AbstractModel;

/**
 * @property int         $id
 * @property string|null $title
 * @property string|null $text_to_replace
 * @property string      $path
 * @property string $category_name
 * @property string $category
 */
class Emoji extends AbstractModel
{
    protected $table = 'my_emoji';
    /**
     * Create a new emoji.
     *
     * @param  string $title
     * @param  string $textToReplace
     * @param  string $path
     * @return static
     */
    public static function build($category,$category_name,$title, $textToReplace, $path)
    {
        $emoji = new static;

        $emoji->category = $category;
        $emoji->category_name = $category_name;
        $emoji->title = $title;
        $emoji->text_to_replace = $textToReplace;
        $emoji->path = $path;

        return $emoji;
    }
}
