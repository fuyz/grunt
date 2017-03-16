'use strict';
module.exports = function (grunt) {

    var mozjpeg = require('imagemin-mozjpeg');

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['lib/lucifer.js'],
                dest: 'dist/js/lucifer.js'
            },
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: 'lib/lucifer.js',
                dest: 'dist/js/lucifer.min.js'
            }
        },
        nodeunit: {
            files: ['test/**/*_test.js']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                globals: {
                    $: true,
                    jQuery: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib: {
                options: {
                    jshintrc: 'lib/.jshintrc'
                },
                src: ['lib/**/*.js']
            },
            test: {
                src: ['test/**/*.js']
            },
            js: {
                src: ['js/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib: {
                files: '<%= jshint.lib.src %>',
                tasks: ['jshint:lib', 'nodeunit']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'nodeunit']
            },
            dist: {
                files: 'lib/lucifer.js',
                tasks: ['uglify:dist','nodeunit']
            }
        },
        htmlmin: {
            options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
            },
            compress: {
                files: {                                   // Dictionary of files
                    'dist/html/login.min.html': 'html/login.html',    // 'destination': 'source'
                    'dist/html/report.min.html': 'html/report.html'
                }
            }
        },
        cssmin: {
            // target: {
            //     files: [{
            //         expand: true,
            //         cwd: 'css',
            //         src: ['*.css'],
            //         dest: 'dist/css',
            //         ext: '.min.css'
            //     }]
            // }
            options: {
                keepSpecialComments: 0
            },
            compress: {
                files: {
                    'dist/min/default.min.css': ["css/highlight.css", "css/highlight2.css"],
                    'dist/min/default2.min.css': ["css/highlight2.css"]
                }
            }
        },
        imagemin:{
            static: {                          // Target
                options: {                       // Target options
                    optimizationLevel: 3,
                    svgoPlugins: [{ removeViewBox: false }],
                    // use: [mozjpeg()]
                },
                files: {                         // Dictionary of files
                    'dist/img/img.jpeg': 'img/1.jpeg',
                    'dist/img/img.png': 'img/3.png', // 'destination': 'source'
                    'dist/img/img.jpg': 'img/2.jpg',
                    'dist/img/img.gif': 'img/loading.gif'
                }
            },
            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'img/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,jpeg,gif}'],   // Actual patterns to match
                    dest: 'dist/img2'                  // Destination path prefix
                }]
            }
        },
        sass: {                              // Task
            dist: {                            // Target
                options: {                       // Target options
                    style: 'expanded'
                },
                files: {                         // Dictionary of files
                    'css/main.css': 'sass/index.scss',       // 'destination': 'source'
                }
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task.
    grunt.registerTask('default', ['jshint', 'nodeunit', 'concat', 'uglify']);

};
