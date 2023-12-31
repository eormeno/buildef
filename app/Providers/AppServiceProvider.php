<?php

namespace App\Providers;

use App\Services\SessionManagerService;
use Illuminate\Support\ServiceProvider;
use Laravel\Prompts\Output\ConsoleOutput;

class AppServiceProvider extends ServiceProvider
{
	/**
	 * Register any application services.
	 */
	public function register(): void
	{
		// $this->app->singleton('session-manager', function ($app) {
		//     return new SessionManagerService();
		// });
		$this->app->alias('session-manager', SessionManagerService::class);
	}

	/**
	 * Bootstrap any application services.
	 */
	public function boot(): void
	{
		$this->app->bind('console-output', function ($app) {
			return new \Symfony\Component\Console\Output\ConsoleOutput();
		});
	}
}