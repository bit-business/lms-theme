const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);

// Skijasi
mix.js("vendor/skijasi/core/src/resources/js/app.js", "public/js/skijasi.js")
    .sass("vendor/skijasi/core/src/resources/js/assets/scss/style.scss", "public/css/skijasi.css")
    .vue()// LMS Theme
require("vuetifyjs-mix-extension");
mix.js(
    "package/skijasi/lms-theme/src/resources/app/app.js",
    "public/js/lms-theme.js"
)
    .vuetify("vuetify-loader@^1.7.1", { postCss: true })
    .postCss(
        "package/skijasi/lms-theme/src/resources/css/app.css",
        "public/css/lms-theme.css",
        [require("tailwindcss")]
    )
    .vue();