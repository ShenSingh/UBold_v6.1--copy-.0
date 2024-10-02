var gulp = require("gulp"),
    rename = require("gulp-rename"),
    vars = require('../variables');
    sourcemaps = require("gulp-sourcemaps")
    concat = require("gulp-concat")
    npmdist = require('gulp-npm-dist')
    vars = require('../variables');

// Copy assets/vendors from their node_module package to dist folder
const copyAssets = function () {

    const out = vars.getDistAssetsPath() + "js/";

    gulp
        .src([
            vars.getDistAssetsPath() + "libs/jquery/jquery.min.js",
            vars.getDistAssetsPath() + "libs/bootstrap/js/bootstrap.bundle.min.js",
            vars.getDistAssetsPath() + "libs/simplebar/simplebar.min.js",
            vars.getDistAssetsPath() + "libs/node-waves/waves.min.js",
            vars.getDistAssetsPath() + "libs/waypoints/lib/jquery.waypoints.min.js",
            vars.getDistAssetsPath() + "libs/jquery.counterup/jquery.counterup.min.js",
            vars.getDistAssetsPath() + "libs/feather-icons/feather.min.js",
            vars.getDistAssetsPath() + "libs/tippy.js/tippy.all.min.js",
        ])

        .pipe(sourcemaps.init())
        .pipe(concat("vendor.js"))
        .pipe(rename({ suffix: ".min" })) // rename vendor.js to vendor.min.js
        .pipe(gulp.dest(out));

    // data (json data) folder copy form src folder
    var outData = vars.getDistAssetsPath() + "data/";

    return gulp.src([vars.getBaseAssetsPath() + "data/**/*"]).pipe(gulp.dest(outData));

}

const copyLibs = function () {
    const outLibs = vars.getDistAssetsPath() + "libs/";
    return gulp
        .src(npmdist(), { base: "./node_modules" })
        .pipe(rename(function(path) {
            path.dirname = path.dirname.replace(/\/dist/, '').replace(/\\dist/, '');
        }))
        .pipe(gulp.dest(outLibs));

}

gulp.task(copyAssets);
gulp.task(copyLibs);