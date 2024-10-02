var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    babel = require('gulp-babel'),
    rename = require("gulp-rename"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    vars = require('../variables');

// Compile and concate js
const compileJs = function () {

    const baseAssets = vars.getBaseAssetsPath();
    const out = vars.getDistAssetsPath() + "js/";

    gulp
        .src([baseAssets + "js/main.js", baseAssets + "js/layout.js"])
        .pipe(sourcemaps.init())
        .pipe(concat("app.js"))
        .pipe(gulp.dest(out))
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" })) // rename app.js to app.min.js
        .pipe(gulp.dest(out))

    gulp
        .src(baseAssets + "js/head.js")
        .pipe(gulp.dest(out))
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest(out))

    return gulp
        .src([baseAssets + "js/**/*.js", '!' + baseAssets + "js/main.js", '!' + baseAssets + "js/layout.js", '!' + baseAssets + "js/head.js"])
        .pipe(uglify())
        .pipe(gulp.dest(out))

}

gulp.task(compileJs);