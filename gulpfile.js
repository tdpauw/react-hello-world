var gulp = require('gulp');

var del = require('del');
var merge = require('merge-stream');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var ignore = require('gulp-ignore');
var webserver = require('gulp-webserver');

var srcFiles = 'src/*.{html,css,js,jsx}';
var buildDir = './build';

var copy = function() {
  var jsFiles = gulp.src(srcFiles)
    .pipe(ignore.include('**/*.jsx'))
    .pipe(babel({
      presets: ['react'],
      only: '**/*.jsx',
      compact: false
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(buildDir));

  var otherFiles = gulp.src(srcFiles)
    .pipe(ignore.exclude('**/*.jsx'))
    .pipe(gulp.dest(buildDir));

  return merge(jsFiles, otherFiles);
};

gulp.task('clean', function() {
  return del(buildDir);
});

gulp.task('copy', ['clean'], copy);
gulp.task('copy-watch', copy);

gulp.task('watch', function() {
  var watcher = gulp.watch(srcFiles, ['copy-watch']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('webserver', ['copy'], function() {
  gulp.src(buildDir)
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: 'index.html'
    }));
});

gulp.task('default', ['watch', 'copy', 'webserver'])
