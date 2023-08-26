<?php

namespace App\Components;

use App\Services\SessionManagerService;

class AWidget
{
    private static int $nextId = 0;
    private SessionManagerService $sessionManagerService;
    private int $id;

    public function __construct()
    {
        $this->sessionManagerService = app('session-manager');
        $this->id = self::$nextId++;
        $this->registerMe($this);
    }

    private function registerMe(AWidget $newWidget): void
    {
        $this->sessionManagerService->registerComponent($newWidget);
    }

    public function toJson(): string
    {
        return json_encode([
            'id' => $this->id,
            'class' => get_class($this)
        ]);
    }

}