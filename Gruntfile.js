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
                        globals: {
                            jQuery: true,
                            console: true,
                            module: true,
                            document: true
                        },
                        '-W099': true // Hide tabs spaces warning
                    },
                    files: {
                        src: ['Gruntfile.js', '<%= config.app %>/js/main.js', '<%= config.app %>/js/plugins.js']
                    }
                }
            },

            scsslint: {
                all: {
                    options: {
                        compact: true
                    },
                    files: [{
                        expand: true,
                        cwd: '<%= config.app %>/scss/echo-base/',
                        src: ['**/*.{scss,sass}'],
                    }]
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
                all: {
                    options: {
                        browsers: ['last 2 version', 'ie 8', 'ie 9', 'Firefox ESR', 'Opera 12.1']
                    },
                    no_dest: {
                        src: '<%= config.dist %>/css/main.css' // globbing is also possible here
                    }
                }
            },

            watch: {
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
        });

        // Do image related tasks
        grunt.registerTask('do-img', ['newer:imagemin:all', 'notify:img']);

        // Do JavaScript related tasks
        grunt.registerTask('do-js', ['jshint:all', 'concat', 'uglify', 'notify:js']);

        // Do Sass related tasks
        grunt.registerTask('do-sass', ['scsslint', 'sass:development', 'autoprefixer:all', 'notify:sass']);

        // Default - Compile all then watch for changes
        grunt.registerTask('default', ['do-img', 'do-sass', 'do-js', 'watch']);
    };
})();
