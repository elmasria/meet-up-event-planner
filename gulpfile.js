
/*eslint-env node*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('default', [], function(){
	//gulp.watch('sass/**/*.scss',['styles']);
	//gulp.watch('javascript/**/*.js', ['lint']);
	//gulp.watch('/index.html', ['copy-html']);

	browserSync.init({
		server: './'
	});
});

gulp.task('dist', [
	'copy-html',
	'copy-images',
	'styles',
	'scripts-dist'
	]);

gulp.task('scripts', function(){
	gulp.src('javascript/**/*.js')
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./javascript'));
});

gulp.task('scripts-dist', function(){
	gulp.src('javascript/**/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function(){
	gulp.src('./index.html')
	.pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function(){
	gulp.src('images/**/*')
	.pipe(gulp.dest('dist/img'));
});

gulp.task('lint', function(){
	return gulp.src(['javascript/**/*.js'])
	.pipe(eslint())
	.pipe(eslint.format())
	.pipe(eslint.failOnError);
});

gulp.task('styles', function () {
	gulp.src('sass/**/*.scss')
	.pipe(sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(autoprefixer({
		browser: ['last 2 versions']
	}))
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.stream());
});

