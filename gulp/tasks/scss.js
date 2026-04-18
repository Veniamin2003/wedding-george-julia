import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import map from 'gulp-sourcemaps';

const sass = gulpSass(dartSass);

const plugins = [];

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
            title: "SCSS",
            message: "Error: <%= error.message %>"
        })))
        .pipe(map.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(groupCssMediaQueries())
        // .pipe(webpcss(
        //         {
        //             webpClass: '.webp',
        //             noWebpClass: '.no-webp'
        //         }
        //     )
        // )
        .pipe(autoprefixer({
                grid: true,
                overrideBrowserslist: ["last 3 version"],
                cascade: true
            })
        )
        //Раскомментировать, если нужен не сжатый дубль файла
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(cleanCss())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(map.write('.'))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
}

export const styleLibs = () => {
    if(plugins.length > 0) {
        return app.gulp.src(plugins)
        .pipe(map.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(rename({
            extname: '.css'
        }))
        .pipe(map.write('.'))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream());
    }
}