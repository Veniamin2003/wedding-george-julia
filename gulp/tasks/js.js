import webpack from 'webpack-stream';
import map from 'gulp-sourcemaps';
import uglify from 'gulp-uglify-es';
import babel from 'gulp-babel';

export const js = () => {
    return app.gulp.src(app.path.src.js, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'JS',
                message: 'Error: <%= error.message %>'
            }))
        )
        .pipe(map.init())
        .pipe(babel({
			presets: ['@babel/env']
		}))
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            entry: {
                gen: './src/scripts/gen.js',
                'index.page': './src/scripts/index.js',
            },
            output: {
                filename: '[name].min.js'
            }
        }))
        .pipe(uglify.default())
        .pipe(map.write('.'))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}