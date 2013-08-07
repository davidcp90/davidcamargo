module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            project: 'David Camargo',
            version: '0.1',
            banner: '/*! <%= meta.project %> - v<%= meta.version %> - Copyright (c) David Camargo <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */'
        },

        uglify: {
            options: {
                banner: '/*! <%= meta.project %> - v<%= meta.version %> - Copyright (c) David Camargo. Build Time: <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %> */',
                mangle: false,
                compress: true
            },

            build: {
                files: {
                    'content/build/js/StudentRequests.min.js': ['content/src/js/StudentRequests.js'],    
                    'content/build/js/AcceptingTutors.min.js': ['content/src/js/AcceptingTutors.js'],    
                    'content/build/js/RegisterForm.min.js': ['content/src/js/RegisterForm.js'],    
                    'content/build/js/ProfileEdition.min.js': ['content/src/js/ProfileEdition.js'],    
                    'content/build/js/ResetPassword.min.js': ['content/src/js/ResetPassword.js'],    
                    'content/build/js/TutorPreferences.min.js': ['content/src/js/TutorPreferences.js'],    
                    'content/build/js/StudentPreferences.min.js': ['content/src/js/StudentPreferences.js'],    
                    'content/build/js/RateTutor.min.js': ['content/src/js/RateTutor.js'],   
                    'content/build/js/ApplicationForm.min.js': ['content/src/js/ApplicationForm.js']
                }                                
            }
        },

        clean: ['content/build/css', 'content/build/js'],

        compass: {
            dist: {
                options: {
                    config: 'content/config_dev.rb'
                }
            },

            dev: {
                options: {
                  config: 'content/config.rb',
                }  
            }
        },

        shell: {
            server: {
                command: './manage.py runserver 0.0.0.0:8000'
            }
        },

        watch: {
            compass: {
                files: ['content/**'],
                tasks: ['compass:dev']
            }
        },

        requirejs: {
            compile: {
                options: {            
                    optimize: 'none',                
                    baseUrl: 'content/src/js',                    
                    dir: 'content/build/js',
                    optimize: "none",
                    preserveLicenseComments: false,

                    paths: {
                        'jquery':'../../components/jquery/jquery.min'

                    },
                    shim: {
                        'jquery': {
                            exports: 'jQuery'
                        }
                    },            

                    modules: [
                        {
                            name: 'ApplicationForm'
                        },
                        {
                            name: 'StudentRequests'
                        }
                    ]
                }
            }
        }


    }); 

    grunt.loadNpmTasks('grunt-contrib-requirejs');    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.registerTask( 'production', ['clean', 'compass:dist', 'requirejs', 'uglify'] );

};