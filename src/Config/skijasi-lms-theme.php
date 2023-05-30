<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Theme Prefix
    |--------------------------------------------------------------------------
    |
    | This prefix will set the entry point of the skijasi commerce theme.
    |
    */
    'theme_prefix' => env('MIX_COMMERCE_WEB_ROUTE_PREFIX', 'lms'),

    /*
    |--------------------------------------------------------------------------
    | Override Controller
    |--------------------------------------------------------------------------
    |
    | Register a controller to override the default controller.
    |
    */
    'controllers' => [
        'api' => [],
        'web' => [],
    ],
];
