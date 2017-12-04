//何并所有文件
//import requireDir from 'require-dir'
//requireDir('./tasks');

import gulp from 'gulp';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named';
import livereload from 'gulp-livereload';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import liveserver from 'gulp-live-server'
import less from 'gulp-less';
import minifyCss from 'gulp-minify-css'
import autoprefixer from 'gulp-autoprefixer'
import del from 'del'
import gulpSequence from 'gulp-sequence'

import {log, colors} from 'gulp-util';
import args from './tasks/util/args';


gulp.task('js', () => {
    return gulp.src(['app/js/index.js'])
        .pipe(plumber())
        .pipe(named())
        .pipe(gulpWebpack({
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel-loader'
                }]
            }
        }), null, (err, stats) => {
            log(`Finished '${colors.cyan('scripts')}'`, stats.toString({
                chunks: false
            }))
        })
        .pipe(gulp.dest('server/public/js'))
        .pipe(rename({
            basename: 'index',
            extname: '.min.js'
        }))
        .pipe(uglify({compress: {properties: false}, output: {'quote_keys': true}}))
        .pipe(gulp.dest('server/public/js'))
        .pipe(gulpif(args.watch, livereload()))
});


gulp.task('pages', () => {
    return gulp.src(['app/views/*.ejs'])
        .pipe(gulp.dest('server/views'))
        .pipe(gulpif(args.watch, livereload()))
});


gulp.task('less', () => {
    return gulp.src(['app/less/*.less'])
        .pipe(less())
        .pipe(gulp.dest('server/public/css'))
        .pipe(minifyCss())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('server/public/css'))
        .pipe(gulpif(args.watch, livereload()))
});

gulp.task('server', (cb) => {
    if (!args.watch) return cb();

    let server = liveserver.new(['--harmony', 'server/bin/www']);
    server.start();

    gulp.watch([
        'server/public/css/*.css',
        'server/views/*.ejs',
        'server/public/js/*.js'
    ], (file) => {
        server.notify.apply(server, [file])
    });

    gulp.watch([
        'server/routes/**/*.js',
        'server/app.js'
    ], () => {
        server.start.bind(server)();
    })


});

gulp.task('browser', (cb) => {
    if (!args.watch) return cb();
    console.log('需要监听')
    gulp.watch('app/**/*.js', ['js']);
    gulp.watch('app/**/*.ejs', ['pages']);
    gulp.watch('app/**/*.less', ['less']);
});

gulp.task('del', () => {
    return del(['server/public', 'server/views'])
});

gulp.task('build', gulpSequence('del', 'less', 'pages', 'js', ['browser', 'server']));

gulp.task('default', ['build']);





