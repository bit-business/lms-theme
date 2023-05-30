<?php

namespace NadzorServera\Skijasi\Theme\LMSTheme\Facades;

use Illuminate\Support\Facades\Facade;

class LMSTheme extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'lms-theme';
    }
}
