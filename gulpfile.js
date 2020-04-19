'use strict';

const gulp = require('gulp');
const zip = require('gulp-zip');
const fs = require('fs-extra');

gulp.task( 'lib_update', (done) => {
	fs.copySync('app/node_modules/jquery/dist/', 'app/lib/jquery/');
	fs.copySync('app/node_modules/bootstrap/dist/', 'app/lib/bootstrap/');
	done();
});

gulp.task('zip', () => {
    const json = JSON.parse(fs.readFileSync('./app/manifest.json','utf-8'));
    const v = json.version.replace(/\./g, "_");
    return gulp.src([
            'app/**/*',
            '!app/package.json',
            '!app/yarn.lock',
            '!app/node_modules/**'
        ])
        .pipe(zip('feeduck_'+ v +'.zip'))
        .pipe(gulp.dest('release'));
});

//リリース
gulp.task('release', gulp.series('lib_update','zip'));

gulp.task('default', (done) => {
	console.log('');
	console.log('=====================');
	console.log('       COMMAND       ');
	console.log('=====================');
	console.log('$ gulp lib_update');
	console.log('$ gulp zip');
	console.log('$ gulp release');
	console.log('=====================');
	console.log('');
	done();
});
