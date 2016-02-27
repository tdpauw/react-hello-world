var gulp = require('gulp');

var del = require('del');
var merge = require('merge-stream');
var webserver = require('gulp-webserver');

var srcFiles = ['src/*.{html,js,jsx,css}'];
var buildDir = './build';

var copy = function() {
  var src = gulp.src(srcFiles, { base: 'src' })
    .pipe(gulp.dest(buildDir));

  // var vendor = gulp.src(
  //     [
  //       './node_modules/bootstrap/dist/css/bootstrap.min.css',
  //       './node_modules/bootstrap/dist/css/bootstrap.min.css.map',
  //       './node_modules/font-awesome/css/font-awesome.min.css',
  //       './node_modules/font-awesome/fonts/*.*',
  //       './node_modules/jquery/dist/jquery.min.js'
  //     ], {
  //       base: '.'
  //     })
  //   .pipe(gulp.dest(buildDir));

  // return merge(src, vendor);
  return src;
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
