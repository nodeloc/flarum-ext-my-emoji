<?php

namespace Nodeloc\MyEmoji\Commands;

class CreateEmoji
{
    /**
     * The attributes of the new emoji.
     *
     * @var array
     */
    public $data;

    /**
     * @param array $data The attributes of the new emoji.
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }
}
