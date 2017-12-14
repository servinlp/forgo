const gulp =        require( 'gulp' ),
    pump =          require( 'pump' ),
    sass =          require( 'gulp-sass' ),
    uglify =        require( 'gulp-uglify' ),
    sourcemaps =    require( 'gulp-sourcemaps' ),
    autoprefixer =  require( 'gulp-autoprefixer' ),
    cleanCSS =      require( 'gulp-clean-css' ),
    browserify =    require( 'browserify' ),
    babelify =      require( 'babelify' ),
    source =        require( 'vinyl-source-stream' ),
    buffer =        require( 'vinyl-buffer' ),
    browserSync =   require('browser-sync').create(),
    imagemin =      require( 'gulp-imagemin' ),
    scsslint =      require( 'gulp-scss-lint' ),
    eslint =        require( 'gulp-eslint' )

gulp.task( 'scss-lint', () => {

    pump( [
        gulp.src( [ 'src/css/*.scss', 'src/css/**/*.scss', '!src/css/**/_reset.scss' ] ),
        scsslint( {
            'config': 'csslint.yml'
        } )
    ] )

} )

gulp.task( 'css', () => {

    pump( [
        gulp.src( [ 'src/css/*.scss', 'src/css/**/*.scss' ] ),
        sourcemaps.init(),
        sass().on( 'error', sass.logError ),
        autoprefixer( {
            browsers:   [ 'last 2 versions' ],
            cascade:    false
        } ),
        cleanCSS(),
        sourcemaps.write( './' ),
        gulp.dest( 'build/css' ),
        browserSync.stream()
    ] )

})

gulp.task( 'eslint', () => {

    pump( [
        gulp.src( [ 'src/js/*.js', 'src/js/**/*.js' ] ),
        eslint( {
            useEslintrc: true
        } ),
        eslint.results( results => {
            console.log(`Total Results: ${results.length}`);
            console.log(`Total Warnings: ${results.warningCount}`);
            console.log(`Total Errors: ${results.errorCount}`);
        }),
        eslint.format(),
        eslint.failAfterError()
    ] )

})

gulp.task( 'js', ['eslint'], () => {

    const bundler = browserify( './src/js/app.js' )
                        .transform( babelify, {
                            presets: [ 'env' ]
                        } )

    pump( [
        bundler.bundle().on( 'error', err => { console.log( err ) } ),
        source( 'app.js' ),
        buffer(),
        sourcemaps.init(),
        uglify(),
        sourcemaps.write( './' ),
        gulp.dest( 'build/js' ),
        browserSync.stream()
    ] )

})

gulp.task( 'js-build', () => {

	pump( [
		gulp.src( 'src/js-static/*.js' ),
		gulp.dest( 'build/js' )
	] )

})

gulp.task( 'image', () => {

    pump( [
        gulp.src( 'src/images/*' ),
        imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]),
        gulp.dest( 'build/images' ),
        browserSync.stream()
    ] )

})

gulp.task( 'objects', () => {

    pump( [
        gulp.src( [ 'src/objects/*', 'src/objects/**/*' ] ),
        gulp.dest( 'build/objects' )
    ] )

})

gulp.task( 'browser-sync', () => {

    browserSync.init({
        open: false,
        server: {
            baseDir: "./"
        }
    })

    gulp.watch( [ 'src/css/*.scss', 'src/css/**/*.scss' ], [ 'scss-lint', 'css' ] )
    gulp.watch( [ 'src/js/*.js', 'src/js/**/*.js' ], [ 'js' ] )
	gulp.watch( 'src/js-static/*.js', [ 'js-build' ] )
    gulp.watch( 'src/images/*', [ 'image' ] )
    gulp.watch( 'src/objects/*', [ 'objects' ] )
    gulp.watch( './*.html' ).on( 'change', browserSync.reload )

})

gulp.task( 'default', [ 'css', 'js', 'js-build', 'image', 'objects' ] )
gulp.task( 'start', [ 'browser-sync' ] )