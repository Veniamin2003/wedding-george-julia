import sprite from "gulp-svg-sprite";
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import replace from 'gulp-replace';

export const svgSprite = () => {
    return app.gulp.src(`${app.path.src.svg}`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[style]').removeAttr('style');
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(sprite({
            mode: {
                symbol: {
                    sprite: 'symbol.svg',
                    // render: {
                    //     scss: {
                    //         dest: '../../../src/styles/_symbol.scss',
                    //         template: './src/styles/templates/_sprite_template.scss'
                    //     }
                    // }
                }
            }
        }))
        .pipe(app.gulp.dest(`${app.path.build.images}`));
}

export const svg = () => {
    return app.gulp.src(`${app.path.src.svg}`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[style]').removeAttr('style');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(replace('&gt;', '>'))
        .pipe(sprite({
            shape: true
        }))
        .pipe(app.gulp.dest(`${app.path.build.images}`));
}