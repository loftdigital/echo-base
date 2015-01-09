'use strict';

module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        scsslint: 'grunt-scss-lint'
    });

    var config = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Project settings
        config: config,

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['<%= config.app %>/**/*.js'],
                dest: '<%= config.dist %>/js/main.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                sourceMap: true
            },
            dist: {
                files: {
                    '<%= config.dist %>/js/main.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        jshint: {
            files: ['Gruntfile.js', '<%= config.app %>/js/main.js', '<%= config.app %>/js/plugins.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                },
                '-W099': true // Hide tabs spaces warning
            }
        },

        scsslint: {
            allFiles: ['<%= config.app %>/scss/echo-base/**/*.scss'],
            options: {
                compact: true
            }
        },

        sass: {
            options: {
                sourceMap: true,
                includePaths: ['bower_components']
            },
            development: {
                options: {
                    outputStyle: 'expanded',
                },
                files: {
                    '<%= config.dist %>/css/main.css': '<%= config.app %>/scss/main.scss',
                }

            },
            production: {
                options: {
                    outputStyle: 'compressed',
                },
                files: {
                    '<%= config.dist %>/css/main.css': '<%= config.app %>/scss/main.scss',
                }
            }

        },

        autoprefixer: {
            options: {
                browsers: ['last 2 version', 'ie 8', 'ie 9', 'Firefox ESR', 'Opera 12.1']
            },
            no_dest: {
                src: '<%= config.dist %>/css/main.css' // globbing is also possible here
            }
        },

        watch: {
            js: {
                files: ['<%= config.app %>/js/**/*.js'],
                tasks: ['jshint', 'concat', 'uglify', 'notify:js']
            },
            sass: {
                files: ['<%= config.app %>/scss/**/*.scss'],
                tasks: [ 'newer:scsslint', 'sass:development', 'autoprefixer', 'notify:sass']
            }
        },

        notify: {
            sass: {
                options: {
                    title: 'Sass Notification',
                    message: 'Sass compiling complete!'
                }
            },
            js: {
                options: {
                    title: 'Grunt JS Notification',
                    message: 'Js compiling complete'
                }
            }
        },
    });

    grunt.registerTask('default', ['newer:scsslint', 'sass:development', 'autoprefixer', 'notify:sass', 'watch']);
};
