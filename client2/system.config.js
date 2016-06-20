(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'app',
        '@angular': '../node_modules/@angular',
        'rxjs': '../node_modules/rxjs'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'app.bootstrap.ts', defaultExtension: 'ts' },
        'rxjs': { defaultExtension: 'js' }
    };

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade'
    ];

    ngPackageNames.forEach(function (pkgName) {
        packages['@angular/' + pkgName] = { 
            main: 'index.js', 
            defaultExtension: 'js' 
        };
    });

    var config = {
        transpiler: 'typescript',
        map: map,
        packages: packages
    };

    System.config(config);

})(this);
