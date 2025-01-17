var path = require('path');
var config = require('../../config/');
const sass = require('gulp-sass')(require('sass'));
var glob = require('glob');

module.exports.task = function(gulp, plugins, paths) {

	return function app_themes(done) {
		// For each theme file
		glob.sync(paths.app.themes).forEach(function(filePath) {

			// Prepend file to styles glob
			var src = [].concat(paths.app.styles);
			src.unshift(filePath);

			// Theme name
			var name = "app-" + path.basename(filePath, '.js').replace("-theme", "");

			gulp.src(src)
				.pipe(plugins.concat(name))
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
				.pipe(gulp.dest(config.destDir + '/css'))
				.pipe(plugins.connect.reload());
		});
		done();
	};

};

module.exports.deps = ['app-styles'];
