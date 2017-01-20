const webpack = require('webpack');
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const webpackStream = require('webpack-stream');

const webpackConfig = {
  output: {
    filename: 'scripts.js'
  },
  watch: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('javascript', (cb) => {
  gulp.src('./src/index.js')
    .pipe(webpackStream(webpackConfig))
    .on('error', swallowError)
    .pipe(gulp.dest('./assets/js'));

  cb();
});

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

gulp.task('default', gulp.parallel('styles', 'javascript', (done) => {
  gulp.watch('./src/styles/**/*.scss', gulp.parallel('styles')).on('error', swallowError);
  // gulp.watch('./src/js/**/*.js', gulp.parallel('javascript')).on('error', swallowError);

  done();
}));