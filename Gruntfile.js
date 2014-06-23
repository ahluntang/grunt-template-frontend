module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);


    var path   = require('path');
    var srcDir    = path.resolve(__dirname, 'src');
    var destDir   = path.resolve(__dirname, 'public');
    var tmpDir   = path.resolve(__dirname, 'tmp');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: {
                    line: true,
                    block: true,
                },
                banner: '/*!\n * <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
                        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
                        ' * \n' +
                        ' * License: <%= pkg.license.type %> -  <%= pkg.license.url %>\n' +
                        ' */\n\n',
                separator: ';\n',
            },
            dist: {
                src: [ srcDir + '/assets/js/000-libs/*', srcDir + '/assets/js/100-core.js'],
                dest: tmpDir + '/assets/js/app.min.js',
            },
        },
        uglify: {
            options: {
                mangle: false,
                banner: '/*!\n * <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
                        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
                        ' * \n' +
                        ' * License: <%= pkg.license.type %> -  <%= pkg.license.url %>\n' +
                        ' */\n\n',
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: tmpDir +'/assets/js/',
                    src: 'app.min.js',
                    dest: destDir + '/assets/js/'
                }],
            },
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                src: srcDir + '/assets/css/100-main.scss',
                dest: tmpDir + '/assets/css/main.css'
            }
        },
        cssmin: {
          combine: {
            options: {
              banner: '/*!\n * <%= pkg.name %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
                        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.author.email %>>\n' +
                        ' * \n' +
                        ' * License: <%= pkg.license.type %> -  <%= pkg.license.url %>\n' +
                        ' */\n\n',
            },
            files: [{
                src: [ '/assets/css/000-libs/*', tmpDir + '/assets/css/main.css'],
                dest: destDir + '/assets/css/main.min.css'
            }],
          },
        },
        copy: {
            main: {
                files: [
                  {expand: true, cwd: srcDir, src: ['assets/img/**'], dest: destDir},
                  {expand: true, cwd: srcDir, src: ['assets/fonts/**'], dest: destDir}
                ]
            }
        }
    });

    grunt.registerTask('default', ['concat','uglify:dist', 'sass:dist', 'cssmin:combine', 'copy:main']);
}
