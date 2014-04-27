'use strict';

module.exports = function(grunt) 
{
    grunt.initConfig({
        
        /**
         * External files
         */

        pkg: grunt.file.readJSON('package.json'),
        
        /**
         * Meta datas
         */

        meta: {
	    banner: '/**\n' +
		' * <%= pkg.description %>\n' +
		' * @version v<%= pkg.version %> - ' +
		'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
		' * @link <%= pkg.homepage %>\n' +
		' * @license <%= pkg.license %>' + ' */'
	},

        /**
         * Project Directories
         */

        dir: {
            src: {
                js:   "src/js/",
                sass: "src/sass/",
                as:   "src/as/",
            },
            deploy: {
                assets: "deploy/assets/",
                css:    "<%= dir.deploy.assets %>css/",
                js:     "<%= dir.deploy.assets %>js/",
                swf:    "<%= dir.deploy.assets %>swf/"
            },
            images: "deploy/images/",
            fonts: "deploy/fonts/",
            flex_sdk: "~/Sources/flex_air/sdks/flex_4.6.0_air_sdk_3.4"
        },

        jshint: {
            all: [
                "Gruntfile.js",
                "<%= dir.src.js %>*.js"
            ]
        },

        /**
         * SASS
         */

        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },

                files: {
                    '<%= dir.deploy.css %>main.min.css': [                                     
                        '<%= dir.src.sass %>app.scss',
                    ],

                    '<%= dir.deploy.css %>bootstrap.min.css': [
                        '<%= dir.src.sass %>bootstrap.scss'
                    ]
                }    
            }
        },

        /**
         * Uglify
         */

        uglify: {
            dist: {
                files: {
                    '<%= dir.deploy.js %>scripts.min.js': [                        
                        '<%= dir.src.js %>vendor/jquery-2.1.0.js',

                        '<%= dir.src.js %>plugins/bootstrap/transition.js',
                        '<%= dir.src.js %>plugins/bootstrap/alert.js',
                        '<%= dir.src.js %>plugins/bootstrap/button.js',
                        '<%= dir.src.js %>plugins/bootstrap/carousel.js',
                        '<%= dir.src.js %>plugins/bootstrap/collapse.js',
                        '<%= dir.src.js %>plugins/bootstrap/dropdown.js',
                        '<%= dir.src.js %>plugins/bootstrap/modal.js',
                        '<%= dir.src.js %>plugins/bootstrap/tooltip.js',
                        '<%= dir.src.js %>plugins/bootstrap/popover.js',
                        '<%= dir.src.js %>plugins/bootstrap/scrollspy.js',
                        '<%= dir.src.js %>plugins/bootstrap/tab.js',
                        '<%= dir.src.js %>plugins/bootstrap/affix.js',
                        
                        '<%= dir.src.js %>plugins/swfobject.js',

                        '<%= dir.src.js %>_*.js'
                    ]
                }
            }
        },

        /**
         * Watch Files
         */

        watch: {

            sass: {
                files: [
                  '<%= dir.src.sass %>*.scss',
                  '<%= dir.src.sass %>*bootstrap/*.scss'
                ],
                tasks: ['sass']
            },

            js: {
                files: [
                  'Gruntfile.js',                  
                  '<%= dir.src.js %>plugins/bootstrap/*.js',
                  '<%= dir.src.js %>*.js',
                ],
                tasks: ['jshint', 'uglify']
            },

            as: {
                files: [
                  '<%= dir.src.as %>classes/*.as'
                ],
                tasks: ['grunt-as3']
            }
        },

        /**
         * AS3
         */

        as3: {
            sdk : "<%= dir.flex_sdk %>",

            args : {
                "-debug": "true",
                "-target-player": "11.1",
                "-use-network": "true",
                "-static-link-runtime-shared-libraries": true,
                "-source-path" : "<%= dir.src.as %>classes"
            },

            libs : [
                "<%= dir.src.as %>libs/swc/assets/assets.swc",
                "<%= dir.src.as %>libs/swc/third-party/greensock.swc"
            ],

            files : {            
                "<%= dir.deploy.swf %>main.swf" : ["<%= dir.src.as %>classes/Main.as"]
            }
        },
    });

    /**
     * Load Tasks
     */

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-as3');

    /**
     * Register tasks
     */

    grunt.registerTask('default', [              
        'jshint',
        'test'
    ]);

    grunt.registerTask('test', [              
        'sass',
        'uglify',
        'as3'
    ]);
};
