<?php

namespace App\Services;

use App\Components\AWidget;
use Illuminate\Support\Facades\Auth;

class SessionManagerService
{

	private array $sessionData = [];

	public function createUserSession(): void
	{
		$this->sessionData = [
			'user' => Auth::user(),
			'page' => 'home',
			'changes' => []
		];
	}

	public function getUserSession(): array
	{
		return $this->sessionData;
	}

	public function registerComponent(AWidget $newWidget): void
	{
		$obj = [
			'widget' => $newWidget->toJson(),
			'change' => 0 // 0 - created, 1 - updated, 2 - added
		];
		$this->sessionData['changes'][] = $obj;
	}

	public function setPage(string $pageClassName): void
	{
		// Instantiate the page class given its name. the class is defined in the view.models folder
		$page = new $pageClassName();
		
	}
}