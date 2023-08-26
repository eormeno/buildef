<?php

namespace App\Providers;

use App\Services\SessionManagerService;
use Illuminate\Support\ServiceProvider;

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
        //
    }
}
