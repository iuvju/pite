var fs = require('fs');

module.exports = function (grunt) {
	var defaultVersion = "v1";
	var target = grunt.option('target');
	var target_name = grunt.option('name');
	var pkg = grunt.file.readJSON('package.json');
console.log(target_name);
	grunt.initConfig({
		version : target || defaultVersion,
		moduleName : pkg.name,
		target_name: target_name || pkg.name,
		banner : '/* JBC build, <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
		kmc : {
			options : {
				packages : [{
						name : '<%= moduleName %>',
						path : '../'
					}
				],
				map : [["<%= moduleName %>/src", "jbc/<%=moduleName%>"]]
			},
			main : {
				files : [{
						src : "src/<%= version %>/<%=target_name%>.js",
						dest : "build/<%=version%>/<%=target_name%>.js"
					}
				]
			}
		},
		uglify : {
			options : {
				banner : '<%=banner%>'
			},
			base : {
				files : {
					'build/<%=version%>/<%=target_name%>-min.js' : ['build/<%=version%>/<%=target_name%>.js']
				}
			}
		},
		copy : {
			page : {
				files : [{
						expand : true,
						cwd : 'src/<%= version %>',
						src : ['*.less', '*.css'],
						dest : 'build/<%=version%>'
					}
				]
			}
		},
		cssmin : {
			options : {
				banner : '<%=banner%>'
			},
			page : {
				files : [{
						expand : true,
						cwd : 'src/<%= version %>',
						src : ['*.css', '!*-min.css'],
						dest : 'build/<%=version %>',
						ext : '-min.css'
					}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-kmc');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['kmc:main', 'uglify:base', 'copy:page', 'cssmin:page']);
};
