const path = require('./config/path.js')
const { src, dest } = require('gulp')
const { watch, series, parallel } = require('gulp')
const rename = require("gulp-rename");
//const argv = require('yargs').argv;
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')

const server = () => {
    browserSync.init({
        server: {
            baseDir: path.root
        }
    })
}

/**
 * HTML
 */
const fileInclude = require('gulp-file-include')
const html = () => {
    return src(path.html.src)
        .pipe(plumber({
            errorHandler: notify.onError()
        }))
        .pipe(fileInclude())
        .pipe(dest(path.html.dest))
}
module.exports = html

/**
 * CSS
 */
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const shorthand = require('gulp-shorthand')
const gulpCssMediaQueries = require('gulp-group-css-media-queries')
const sass = require('gulp-sass')(require('sass'))

const scss = () => {
    return src(path.scss.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'SCSS',
                message: error.message
            }))
        }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(shorthand())
        .pipe(gulpCssMediaQueries())
        .pipe(dest(path.scss.dest), { sourcemaps: true })
        //.pipe(rename({ suffix: ".min" }))
        //.pipe(csso())
        //.pipe(dest(path.scss.dest), { sourcemaps: true })
}
module.exports = scss
/**
 * JAVASCRIPT
 */
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const js = () => {
    return src(path.js.src, { sourcemaps: true })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'JavaScript',
                message: error.message
            }))
        }))
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest(path.js.dest), { sourcemaps: '.' })
}
module.exports = js
/**
 * IMAGE
 */
const imageMin = require('gulp-imagemin')
const imageminJpegRecompress = require('imagemin-jpeg-recompress')
const pngquant = require('imagemin-pngquant')
//import imageMin from 'gulp-imagemin';
//import imageminJpegRecompress from 'imagemin-jpeg-recompress';
//import pngquant from 'imagemin-pngquant';
const newer = require('gulp-newer')
//const webp = require('gulp-webp');

const img = () => {
    return src(path.img.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'Image',
                message: error.message
            }))
        }))
        .pipe(newer(path.img.dest))
        .pipe(imageMin([
            imageminJpegRecompress({
                progressive: true,
                min: 70, max: 75
            }),
            pngquant({
                speed: 5,
                quality: [0.6, 0.8]
            }),
        ]))
        // .pipe(imageMin({
        //     verbose: true
        // }))
        .pipe(dest(path.img.dest))
}
module.exports = img
/**
 * FONT
 */
const fonter = require('gulp-fonter')
const ttf2woff2 = require('gulp-ttf2woff2')

const font = () => {
    return src(path.font.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'Font',
                message: error.message
            }))
        }))
        .pipe(newer(path.font.dest))
        .pipe(fonter({
            formats: ['ttf', 'woff', 'eot', 'svg']
        }))
        .pipe(dest(path.font.dest))
        .pipe(ttf2woff2())
        .pipe(dest(path.font.dest))
}
module.exports = font
/**
 * CLEAR
 */
const del = require('del')
const clear = () => {
    return del(path.root)
}
module.exports = clear

const watcher = () => {
    watch(path.html.watch, html).on('all', browserSync.reload)
    watch(path.scss.watch, scss).on('all', browserSync.reload)
    watch(path.js.watch, js).on('all', browserSync.reload)
    watch(path.img.watch, img).on('all', browserSync.reload)
    watch(path.font.watch, font).on('all', browserSync.reload)
}

const build = series(
    clear,
    parallel(html, scss, js, img, font)
)

const dev = series(
    build,
    parallel(watcher, server)
)

module.exports.dev = dev
module.exports.build = build