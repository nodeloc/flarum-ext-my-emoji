<?php

namespace Nodeloc\MyEmoji\Api\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Nodeloc\MyEmoji\Api\Serializers\EmojiSerializer;
use Nodeloc\MyEmoji\Commands\EditEmoji;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdateEmojiController extends AbstractShowController
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
        $id = Arr::get($request->getQueryParams(), 'id');
        $data = Arr::get($request->getParsedBody(), 'data', []);

        return $this->bus->dispatch(
            new EditEmoji($id, $data)
        );
    }
}
