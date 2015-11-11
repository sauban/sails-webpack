var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function () {
  gulp.src([ 'api/**' ])
    .pipe(babel({
      presets: [ 'es2015' ]
    }))
    .pipe(gulp.dest('dist/api'));

  gulp.src([ 'config/**.js' ])
    .pipe(babel({
      presets: [ 'es2015' ]
    }))
    .pipe(gulp.dest('dist/config'));
});
