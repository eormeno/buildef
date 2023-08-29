<?php

namespace App\Providers;

use App\Buildef\Buildef;
use Illuminate\Support\ServiceProvider;

class BuildefServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Buildef::start();
    }
}
