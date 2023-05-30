<?php

namespace NadzorServera\Skijasi\Theme\LMSTheme\Providers;

use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;
use NadzorServera\Skijasi\Theme\LMSTheme\Commands\LMSThemeSetup;
use NadzorServera\Skijasi\Theme\LMSTheme\Facades\LMSTheme as FacadesLMSTheme;
use NadzorServera\Skijasi\Theme\LMSTheme\LMSTheme;

class LMSThemeProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $loader = AliasLoader::getInstance();
        $loader->alias('LMSTheme', FacadesLMSTheme::class);

        $this->app->singleton('lms-theme', function () {
            return new LMSTheme();
        });

        $this->loadTranslationsFrom(__DIR__.'/../resources/lang', 'skijasi-lms');
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'lms-theme');
        $this->loadRoutesFrom(__DIR__.'/../Routes/web.php');

        $this->publishes([
            __DIR__.'/../Seeder'                       => database_path('seeders/Skijasi/LMSTheme'),
            __DIR__.'/../Config/skijasi-lms-theme.php' => config_path('skijasi-lms-theme.php'),
        ], 'SkijasiLMSTheme');

        $this->publishes([
            __DIR__.'/../resources/views' => resource_path('views/vendor/skijasi/lms-theme'),
        ], 'SkijasiLMSThemeViews');
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->registerConsoleCommands();
    }

    /**
     * Register the commands accessible from the Console.
     */
    private function registerConsoleCommands()
    {
        $this->commands(LMSThemeSetup::class);
    }
}
