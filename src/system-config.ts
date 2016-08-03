// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@angular2-material': 'vendor/@angular2-material',
  'immutable': 'vendor/immutable/dist/immutable.js',
  'angular2-uuid': 'vendor/angular2-uuid/index.js',
  'moment': 'vendor/moment/moment.js'
};

/** User packages configuration. */
const packages: any = {
  'immutable':{
    format: 'cjs'
  },
  'angular2-uuid':{
    format: 'cjs'
  },
  'moment':{
    format: 'cjs'
  }
};

// put the names of any of your Material components here
const materialPkgs:string[] = [
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
  'progress-circle'
];

materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});
console.log(packages);
////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
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
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

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
System.config({ map, packages });
