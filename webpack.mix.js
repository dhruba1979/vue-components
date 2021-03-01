const mix = require('laravel-mix');
const path = require('path');

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

mix.sourceMaps(false)
    .alias({
        '@': path.join(__dirname, 'resources/js'),
        vue$: path.join(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js')
    })
    .disableNotifications()
    .js('resources/js/admin.js', 'theme/backend')
    .vue({ version: 3 });
    // .postCss('resources/css/admin.css', 'theme/backend', [
    //    require('postcss-import'),
    //    require('tailwindcss'),
    //    require('autoprefixer'),
    // ]);
