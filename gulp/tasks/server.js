export const server = (done) => {
    let create = app.plugins.browsersync.create();

    create.init({
        server: {
            baseDir: `${app.path.build.html}`
        },
        notify: false,
        port: 3000,
        open: true,
        cors: true,
        watch: true
    });

    // app.gulp.watch("**/*").on('change', create.reload);
}