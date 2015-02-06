(function() {

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
            config: config,

            imagemin: {
                all: {
                    files: [{
                        expand: true,
                        cwd: '<%= config.app %>/img/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: '<%= config.dist %>/img/'
                    }]
                }
            },

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
                all: {
                    options: {
                        jshintrc: true,
                        reporter: require('jshint-stylish')
                    },
                    files: [{
                        expand: true,
                        src: [
                            'Gruntfile.js',
                            '<%= config.app %>/js/main.js',
                            '<%= config.app %>/js/Loft/**/*.js'
                        ]
                    }]
                }
            },

            scsslint: {
                all: {
                    options: {
                        compact: true
                    },
                    files: [{
                        expand: true,
                        cwd: '<%= config.app %>/scss/',
                        src: ['main.scss', 'echo-base/**/*.scss'],
                    }]
                }
            },

            sass: {
                options: {
                    sourceMap: true,
                    includePaths: ['bower_components']
                },
                dist: {
                    options: {
                        outputStyle: 'compressed',
                    },
                    files: [{
                        expand: true,
                        cwd: '<%= config.app %>/scss/',
                        src: '*.scss',
                        dest: '<%= config.dist %>/css/',
                        ext: '.min.css'
                    }]
                },
            },

            autoprefixer: {
                all: {
                    options: {
                        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
                    },
                    files: [{
                        expand: true,
                        cwd: '<%= config.dist %>/css/',
                        src: '*.min.css',
                        dest: '<%= config.dist %>/css/',
                        ext: '.min.css'
                    }]
                }
            },

            sassdoc: {
                default: {
                    src: '<%= config.app %>/scss/',
                },
            },

            watch: {
                options: {
                    livereload: true,
                },
                js: {
                    files: ['<%= config.app %>/js/**/*.js'],
                    tasks: ['do-js']
                },
                sass: {
                    files: ['<%= config.app %>/scss/**/*.scss'],
                    tasks: ['do-sass']
                },
                img: {
                    files: ['<%= config.app %>/img/**/*.{png,jpg,gif}'],
                    tasks: ['do-img']
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
                        message: 'Js compiling complete!'
                    }
                },
                img: {
                    options: {
                        title: 'Grunt Imagemin Notification',
                        message: 'Img optimisation complete!'
                    }
                }
            },

            pixrem: {
                options: {
                    rootvalue: '100%',
                    replace: true
                },
                dist: {
                    src: 'dist/css/main.min.css',
                    dest: 'dist/css/ie.min.css'
                }
            }

        });

        // Do image related tasks
        grunt.registerTask('do-img', ['newer:imagemin:all', 'notify:img']);

        // Do JavaScript related tasks
        grunt.registerTask('do-js', ['newer:jshint:all', 'concat', 'uglify', 'notify:js']);

        // Do Sass related tasks
        grunt.registerTask('do-sass', ['scsslint', 'sass:dist', 'autoprefixer:all', 'notify:sass', 'do-ie']);

        // Run a dev task for all options except sass lint
        grunt.registerTask('dev', ['do-img', 'do-js', 'sass:dist', 'autoprefixer:all', 'notify:sass', 'do-ie'] );

        // Do IE8 Legacy specific tasks
        grunt.registerTask('do-ie', ['pixrem']);

        // Default - Compile all then watch for changes
        grunt.registerTask('default', ['do-img', 'do-sass', 'do-js', 'watch']);
    };
})();
