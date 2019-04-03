const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('eslint', () => gulp.src(['./src/**/*.js', './tests/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format(''))
  .pipe(eslint.failAfterError()));
