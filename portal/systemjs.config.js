 (function (global) {
    System.config({
        paths: {
 
 
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/material': 'npm:@angular/material/material.umd.js',
            'ng2-charts': "node_modules/ng2-charts",
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            'angular2-highcharts': 'https://cdn.rawgit.com/gevgeny/angular2-highcharts/v0.3.0/dist',
            'highcharts/highstock.src': 'https://cdn.rawgit.com/highcharts/highcharts-dist/v4.2.1/highstock.js',
            'primeng': 'node_modules/primeng',
            '@swimlane/ngx-datatable': 'npm:@swimlane/ngx-datatable/release/index.js',
            'angular2-busy': 'npm:angular2-busy',
            'angular2-dynamic-component': 'npm:angular2-dynamic-component',
            'ts-metadata-helper': 'npm:ts-metadata-helper',
            'core-js': 'node_modules/core-js' 

        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-highcharts': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'ng2-charts': { 
                main: 'ng2-charts.js',
                 defaultExtension: 'js' 
             },
            'angular2-busy': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'angular2-dynamic-component': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'ts-metadata-helper': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'core-js': {
defaultExtension: 'js'
},
            'primeng': {
                 main: 'primeng.js',
                 format: 'cjs',
                defaultExtension: 'js'
            }

        },
        
    });
})(this);


