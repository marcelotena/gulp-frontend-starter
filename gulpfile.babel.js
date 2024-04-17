import gulp from 'gulp'

// JS
import babel from 'gulp-babel'
import terser from 'gulp-terser'
import rename from 'gulp-rename'
import sourcemaps from 'gulp-sourcemaps'

// SASS
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass);
import autoprefixer from 'gulp-autoprefixer'

// Clean CSS
import clean from 'gulp-purgecss'

// Image optimization
import imagemin from 'gulp-imagemin'

// Browser sync
import { init as server, stream, reload } from 'browser-sync'

// Plumber
import plumber from 'gulp-plumber'

// --------------------------------------------------------------------
// Locations
// --------------------------------------------------------------------

const jsSourceDir      = 'src/js',
    jsOutputDir      = 'dist/js';

const cssSourceDir     = 'src/scss',
    cssOutputDir     = 'dist/css';


// --------------------------------------------------------------------
// Task: Sass
// --------------------------------------------------------------------

gulp.task('sass', () => {
    return gulp.src(cssSourceDir + '/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}, false).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssOutputDir))
        .pipe(stream());
});

gulp.task('clean', () => {
    return gulp.src('./dist/css/style.css')
        .pipe(plumber())
        .pipe(clean({
            content: ['./*.html'],
            whitelist: [
                'select-arrow-active',
                'select-selected',
                'same-as-selected',
                'active',
                'hidden'
            ]
        }))
        .pipe(gulp.dest(cssOutputDir));
})


// --------------------------------------------------------------------
// Task: JS
// --------------------------------------------------------------------

gulp.task('js', () => {
    return gulp.src(jsSourceDir + '/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(gulp.dest('dist/js'))
        .pipe(terser())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(jsOutputDir));
});

// --------------------------------------------------------------------
// Task: Image optimization
// --------------------------------------------------------------------

gulp.task('imgmin', () => {
    return gulp.src('./src/img/*')
        .pipe(plumber())
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 60, progressive: true}),
            imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest('./dist/img'));
})


// --------------------------------------------------------------------
// Task: Default
// --------------------------------------------------------------------

gulp.task('default', () => {
    server({
        server: './'
    })
    gulp.watch([jsSourceDir + '/*.js', jsSourceDir + '/**/*.js'], gulp.series('js')).on('change', reload);
    gulp.watch([cssSourceDir + '/*.scss', cssSourceDir + '/**/*.scss'], gulp.series('sass'));
});