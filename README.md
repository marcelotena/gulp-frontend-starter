# Front-end starter project with Gulp task runner #

Front-end boilerplate with: Gulp 5, Babel, Sass, BrowserSync and some utility tasks: CSS "clean" with gulp-purgecss to remove unused classes and "imgmin" to optimize images (JPG, PNG or GIF, SVG can also be configured, [see documentation](https://www.npmjs.com/package/gulp-imagemin)).

JS task features: Babel transpiler, sourcemap and Terser to compress/uglify.
SASS task features: SASS transpiler, sourcemap and autoprefixer.

### Development dependencies ###

* Global: node 18.10.0 (+NPM 8.19.2)
* gulp: ^5.0.0
* browser-sync: ^3.0.2
* gulp-sourcemaps: ^3.0.0
* gulp-imagemin": "^9.0.0
* gulp-plumber": "^1.2.1
* gulp-rename": "^2.0.0
* **/////// JS ///////**
* @babel/core: ^7.24.4
* @babel/preset-env: ^7.24.4
* @babel/register: ^7.23.7
* gulp-babel": "^8.0.0
* gulp-terser: ^2.1.0
* **/////// CSS ///////**
* sass 1.75.0
* gulp-sass": "^5.1.0
* gulp-autoprefixer": "^9.0.0
* gulp-purgecss": "^6.0.0



### Building assets ###

To run development server with file watch:
```sh
gulp
```

To optimize CSS removing unused classes (update whitelist in gulfile.babel.js to keep state classes added via JS, such as '.active'):
```sh
gulp clean
```

To optimize images in src/img folder:
```sh
gulp imgmin
```