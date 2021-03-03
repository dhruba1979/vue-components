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

mix
    .webpackConfig((webpack) => {
        return {
            target: ['web', 'es2017'],
            plugins: [
                new webpack.DefinePlugin({
                    __VUE_OPTIONS_API__: true,
                    __VUE_PROD_DEVTOOLS__: false
                })
            ]
        }
    })
    .sourceMaps(false)
    .alias({
        '@': path.join(__dirname, 'resources/js'),
        'nm': path.join(__dirname, 'node_modules'),
        vue$: path.join(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js')
    })
    .options({
        vue: {
            compilerOptions: {
                isCustomElement: (tag) => tag === 'trix-editor'
            }
        }
    })
    .disableNotifications()
    .js('resources/js/admin.js', 'theme/admin')
    .vue({ version: 3 });
    // .postCss('resources/css/admin.css', 'theme/admin', [
    //    require('postcss-import'),
    //    require('tailwindcss'),
    //    require('autoprefixer'),
    // ]);
