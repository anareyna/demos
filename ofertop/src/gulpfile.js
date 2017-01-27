var gulp = require('gulp');
var gutil = require('gulp-util');
var pugNative = require('pug');
var pug = require('gulp-pug');
var stylus = require('gulp-stylus');
var poststylus = require('poststylus');
var lost = require('lost');
var rupture = require('rupture');
var spritesmith = require("gulp.spritesmith");
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var pleeease = require('gulp-pleeease');
var iconfont = require('gulp-iconfont');
var consolidate = require("gulp-consolidate");
var plumberNotifier = require('gulp-plumber-notifier');
var cssVersioner = require('gulp-css-url-versioner');
var rename = require("gulp-rename");
var fs = require('fs');
var del = require('del');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

var jadeflux  = __dirname + "/pug";

var config = {
	is_minified: true
}

var path = {
	repo: '../../../',
	frontend: '../src/',
	src_html: 'pug/',
	src_css: 'stylus/',
	src_js:  [
		'js/**/*.es6',
		'js/libs/**/*.es6',
		'!' + 'js/_**/*.es6',
		'!' + 'js/**/_*.es6',
		'!' + 'js/**/**/_*.es6'
	],
	src_img: 'images/',
	src_sprite: 'images/sprite/*.png',
	dist_html: '../dist/',
	dist_static: '../dist/',
	dist_css: '../dist/css/',
	dist_js: '../dist/js/',
	dist_img: '../dist/img/'
};

var pugAdapter = function (pug){
	pug.runtime.attr = function (key, val, escaped, terse) {
		if (key == "__") {
			return ' ' + val;
		}
		if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
			return '';
		}
		if (val === true) {
			return ' ' + (terse ? key : key + '="' + key + '"');
		}
		if (typeof val.toJSON === 'function') {
			val = val.toJSON();
		}
		if (typeof val !== 'string') {
			val = JSON.stringify(val);
			if (!escaped && val.indexOf('"') !== -1) {
				return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
			}
		}
		if (escaped) val = pug.runtime.escape(val);
		return ' ' + key + '="' + val + '"';
	};
	return pug;
};

var pugCustom = pugAdapter(pugNative);


gulp.task('html', function() {
	gulp.src([
		path.src_html + '*.pug',
		path.src_html + '**/**/*.pug',
		path.src_html + '**/*.pug',
		'!' + path.src_html + '_**/*.pug',
		'!' + path.src_html + '/**/_**/*.pug',
		'!' + path.src_html + '/**/_*.pug'
		]).pipe(plumberNotifier())
		.pipe(pug({
			//pretty : !config.is_minified
			pretty : true,
			basedir: jadeflux,
			pug: pugCustom
		}))
		.pipe(gulp.dest(path.dist_html));
});

gulp.task('stylus', function () {
	return gulp.src([
		path.src_css + '**/*.styl',
		'!' + path.src_css + '**/**/_**/*.styl',
		'!' + path.src_css + '_**/*.styl',
		'!' + path.src_css + '_**/**/*.styl',
		'!' + path.src_css + '**/_*.styl'
	])
	.pipe(plumberNotifier())
	.pipe(stylus({
		use: [
			rupture(),
			poststylus(['lost'])
		]
	}))
	.pipe(cssVersioner({lastcommit: true}))
	.pipe(pleeease({minifier:config.is_minified}))
	.pipe(gulp.dest(path.dist_css));
});

gulp.task('sprite', function () {
	var spriteData = gulp.src(path.src_sprite).pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.styl',
		padding: 2,
		algorithm: 'binary-tree',
		imgPath: '../img/sprite.png'
	}));
	// Pipe image stream through image optimizer and onto disk
	spriteData.img.pipe(gulp.dest(path.dist_img));
	//spriteData.img.pipe(gulp.dest(path.src_img)); // No optimization
	spriteData.css.pipe(gulp.dest(path.src_css + '_00-toolbox/'));
});

gulp.task('imagemin', function () {
	return gulp.src(path.src_img + '**')
	// .pipe(imagemin({
	// 	progressive: true,
	// 	svgoPlugins: [{removeViewBox: false}],
	// 	use: [pngquant()]
	// }))
	.pipe(gulp.dest(path.dist_img));
	});

gulp.task('fonts:compile', function(cb){
	var dirList = []
	fs.readdirSync(path.frontend +  "fonts/").forEach(function(file){
		if(/^[^_]*$/g.test(file)){
			dirList.push(file)
		}
	});
	return gulp.src(path.frontend + '/stylus/_templates/fonts.styl')
		.pipe(consolidate('lodash', { dirList: dirList }))
		.pipe(gulp.dest(path.src_css));
});

gulp.task('icons:compile', function(cb){
	return gulp.src(path.frontend + '/icons/*.svg')
		.pipe(iconfont({
			normalize: true,
			fixedWidth: true,
			fontName: 'iconFonts-webfont',
			appendUnicode: false
		}))
		.on('codepoints', function(codepoints, options) {
			gulp.src(path.frontend + '/stylus/_templates/icons.styl') //Template
			.pipe(consolidate('lodash', {
				glyphs: codepoints,
				fontName: 'iconFonts'
			}))
			.pipe(gulp.dest(path.src_css + '/_00-toolbox'));
		})
		.pipe(gulp.dest(path.frontend + '/fonts/iconFonts'));
});

gulp.task('fonts:copy', function() {
   gulp.src(path.frontend + 'fonts/**/*.{ttf,woff,woff2,eof,svg}')
   .pipe(gulp.dest(path.dist_static + 'fonts/'));
});

gulp.task('js:babel', function(cb) {
    return gulp.src(path.src_js)
	.pipe(plumberNotifier())
 	.pipe(babel({
 	    presets: ['es2015']
 	}))
	.pipe(uglify({
		mangle  : false,
		compress: {
			drop_console: false,
			drop_debugger: true
		},
		output: { beautify: !config.is_minified }
	}))
  .pipe(gulp.dest(path.dist_js));
});

gulp.task('js:hint', function() {
	return gulp.src(path.src_js)
		.pipe(jshint())
		.pipe(plumberNotifier())
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(jshint.reporter('fail'));
 });


gulp.task('browserSync', function(){
	return browserSync({
		notify: true,
		server: {
			baseDir : [path.repo]//[path.dist_html]
		}
	});
});

gulp.task('watch', function() {
	gulp.start('browserSync');
	gulp.watch([path.src_html + '**/*.pug'], ['html', browserSync.reload]);
	gulp.watch([path.src_css + '**/*.styl'], ['stylus', browserSync.reload]);
	gulp.watch([path.src_js], ['js', browserSync.reload]);
});

gulp.task('fonts', function(cb){
	runSequence('fonts:compile', 'stylus', 'fonts:copy', cb)
});

gulp.task('icons', function(cb){
	runSequence('icons:compile', 'fonts:compile', 'stylus', 'fonts:copy', cb)
});

gulp.task('js', function(cb){
	runSequence('js:babel', 'js:hint', cb)
});

gulp.task('all', function(cb) {
	runSequence('html', 'stylus', 'js', 'icons', 'fonts', 'imagemin', 'sprite', cb);
});

gulp.task('default', function(cb) {
	runSequence('html', 'stylus', 'js', cb);
});

