const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('styles', (cb) => {
  gulp.src('./src/styles/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', swallowError)
    .pipe(autoprefixer())
    .pipe(cleanCss({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/css'));

  cb();
});

gulp.task('default', gulp.parallel('styles', (done) => {
  gulp.watch('./src/styles/**/*.scss', gulp.parallel('styles')).on('error', swallowError);

  done();
}));