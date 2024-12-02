var path = require('path');
var config = require('../../config/');
const sass = require('gulp-sass')(require('sass'));

module.exports.task = function(gulp, plugins, paths) {
	
	return function app_styles() {
		return gulp.src(paths.app.styles)
			.pipe(plugins.concat('app.scss'))
			.pipe(
				sass({
					includePaths: [
						path.resolve( config.srcDir ),
						path.resolve( config.npmDir ),
					]
				})
				.on('error', sass.logError)
			)
			.pipe(plugins.autoprefixer())
			// TODO minify
			.pipe(gulp.dest(config.destDir + '/css'))
			.pipe(plugins.connect.reload())
			.on( 'error', sass.logError );
	};
};
