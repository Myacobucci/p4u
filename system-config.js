// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md
/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
var map = {
    '@angular2-material': 'vendor/@angular2-material',
    'immutable': 'vendor/immutable/dist/immutable.js',
    'angular2-uuid': 'vendor/angular2-uuid/index.js',
    'moment': 'vendor/moment/moment.js'
};
/** User packages configuration. */
var packages = {
    'immutable': {
        format: 'cjs'
    },
    'angular2-uuid': {
        format: 'cjs'
    },
    'moment': {
        format: 'cjs'
    }
};
// put the names of any of your Material components here
var materialPkgs = [
    'core',
    'button',
    'card',
    'toolbar',
    'list',
    'sidenav',
    'icon',
    'input',
    'radio',
    'checkbox',
    'progress-circle',
    'tabs'
];
materialPkgs.forEach(function (pkg) {
    packages[("@angular2-material/" + pkg)] = { main: pkg + ".js" };
});
console.log(packages);
////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
var barrels = [
    // Angular specific barrels.
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/http',
    '@angular/router',
    '@angular/forms',
    '@angular/router-deprecated',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    // Thirdparty barrels.
    'rxjs',
    'immutable',
    // App specific barrels.
    'app',
    'app/shared',
    'app/vidriera/components',
    'app/login/login',
    'app/perfil/perfil',
    'app/orden/components',
    'app/regalar/regalar',
    'app/registracion/components/registracion',
    'app/notificacion/components/notificacion',
];
var cliSystemConfigPackages = {};
barrels.forEach(function (barrelName) {
    cliSystemConfigPackages[barrelName] = { main: 'index' };
});
// Apply the CLI SystemJS configuration.
System.config({
    map: {
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
        'main': 'main.js'
    },
    packages: cliSystemConfigPackages
});
// Apply the user's configuration.
System.config({ map: map, packages: packages });
//# sourceMappingURL=system-config.js.map