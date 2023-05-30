<?php

namespace NadzorServera\Skijasi\Theme\LMSTheme\Helpers;

class Routes
{
    public static function getController($key)
    {
        $controllers = config('skijasi-lms-theme.controllers');

        if (! isset($controllers[$key])) {
            return 'NadzorServera\\Skijasi\\Theme\\LMSTheme\\Controllers\\'.$key;
        }

        return $controllers[$key];
    }
}
