<?php

namespace Nodeloc\MyEmoji\Api\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Nodeloc\MyEmoji\Api\Serializers\EmojiSerializer;
use Nodeloc\MyEmoji\Commands\CreateEmoji;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreateEmojiController extends AbstractCreateController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = EmojiSerializer::class;

    /**
     * @var Dispatcher
     */
    protected $bus;

    /**
     * @param Dispatcher $bus
     */
    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }

    /**
     * {@inheritdoc}
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        return $this->bus->dispatch(
            new CreateEmoji(Arr::get($request->getParsedBody(), 'data', []))
        );
    }
}
