<?php

namespace App\Plugins;

use Illuminate\Support\Facades\Blade;

class CustomBladePlugin extends Blade
{
    public static function register(): void
    {
        Blade::directive('miDirectiva', function ($expression) {
            // Lógica de tu directiva
            return "<?php echo strtoupper($expression); ?>";
        });
    }
}