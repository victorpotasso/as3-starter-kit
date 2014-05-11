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
	 * Project infos
	 */
	
	project_alias   : "as3starterkit",

        project_package : "br.victorpotasso",

        /**
         * Project Directories
         */

        dir: {
            src: {
                js:   "src/js/",
                sass: "src/sass/",
                as:   "src/as/",
                icons : "src/icons/",
                certificates: {
                    air:     "src/as/certificates/air/",
                    android: "src/as/certificates/android/",
                    ios:     "src/as/certificates/ios/",
                    osx:     "src/as/certificates/osx/",
                    windows: "src/as/certificates/windows/"
                }
            },

            deploy: {
                web : {
                    assets: "deploy/web/assets/",
                    css:    "<%= dir.deploy.web.assets %>css/",
                    js:     "<%= dir.deploy.web.assets %>js/",
                    swf:    "<%= dir.deploy.web.assets %>swf/",

                },
                               
                docs: "deploy/docs/",

                air : "deploy/air/",

                icons : "icons/", 

                osx : "deploy/osx/",

                android : "deploy/android/",

                ios : "deploy/ios/",

                windows : "deploy/windows/"
            },

            images: "deploy/images/",
            
            fonts: "deploy/fonts/"            
        },

        /**
         * Project passwords
         */

        password : {
            certificate : {
                air     : "123456",
                android : "123456",
                ios     : "valckpass",
                osx     : "123456",
                windows : "123456"
            }        
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
                    '<%= dir.deploy.web.css %>main.min.css': [                                     
                        '<%= dir.src.sass %>app.scss',
                    ],

                    '<%= dir.deploy.web.css %>bootstrap.min.css': [
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
                    '<%= dir.deploy.web.js %>scripts.min.js': [                        
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
                tasks: ['as3']
            }
        },

        /**
         * AS3
         */

        flex_sdk: "~/Sources/flex_air/sdks/air_sdk_13.0",
        as3: {
            
            mxmlc : {
                preloader : {
                    args : [
                        '-debug=true',
                        '-target-player=13.0',
                        '-use-network=true',
                        //'-static-link-runtime-shared-libraries=true',
                        '-source-path=<%= dir.src.as %>classes',
                        "-compiler.include-libraries+=<%= dir.src.as %>libs/swc/assets/preloader.swc",
                        "-compiler.include-libraries+=<%= dir.src.as %>libs/swc/third-party/bulkloader.r323.swc",
                        "-output <%= dir.deploy.web.swf %>preloader.swf <%= dir.src.as %>classes/Preloader.as"
                    ]
                },

                main : {
                    args : [
                        '-debug=true',
                        '-target-player=11.1',
                        '-use-network=true',
                        //'-static-link-runtime-shared-libraries=true',
                        '-source-path=<%= dir.src.as %>classes',
                        "-compiler.include-libraries+=<%= dir.src.as %>libs/swc/assets/assets.swc",
                        "-compiler.include-libraries+=<%= dir.src.as %>libs/swc/third-party/greensock.swc",
                        "-compiler.include-libraries+=<%= dir.src.as %>libs/swc/third-party/Sweatless.swc",
                        "-output <%= dir.deploy.web.swf %>main.swf <%= dir.src.as %>classes/Main.as"
                    ]
                }
            },
            
            adt : {
               
                devices : {
                    arg : [
                        "-devices",
                        "-platform iOS|android"
                    ]
                },

                air_certificate : {
                    args : [
                        "-certificate",
                        "-cn ADigitalID",
                        "-ou VP",
                        "-o VictorPotasso",
                        "-c US",
                        "1024-RSA",
                        "<%= dir.src.certificates.air %>demo.p12",
                        "<%= password.certificate.air %>"
                    ]
                },

                air_publish : {
                    args : [
                        "-package",
                        "-storetype pkcs12",
                        "-keystore <%= dir.src.certificates.air %>demo.p12",
                        "-storepass <%= password.certificate.air %>",
                        "<%= dir.deploy.air %>/demo.air",
                        "<%= dir.src.as %>classes/Main-app.xml",
                        "<%= dir.deploy.web.swf %>main.swf",
                        //"-extdir ${project-anes}",
                        "-C <%= dir.deploy.air %> <%= dir.deploy.icons %>",
                    ]
                },
                
                /*
                air_publish_osx : {
                    args : [
                        "-package", 
                        "-storetype pkcs12",
                        "-keystore <%= dir.src.certificates.osx %>demo.p12",
                        "-target native",
                        "-storepass <%= password.certificate.osx %>",
                        "<%= dir.deploy.osx %>demo.dmg",
                        "<%= dir.src.as %>classes/Main-app.xml"
                        //"-extdir extensionsDir",
                        //"index.html resources"
                    ]
                },            
                */

                /*
                air_publish_windows : {
                    args : [
                        "-package",
                        "-storetype pkcs12", 
                        "-keystore <%= dir.src.certificates.windows %>demo.p12",
                        "-target native", 
                        "-storetype pkcs12", 
                        "<%= dir.deploy.windows %>demo.exe", 
                        "<%= dir.src.as %>classes/Main-app.xml",
                        //"index.html resources"
                    ]
                },
                */
                
                android_publish : {
                    args : [
                        "-package",
                        "-target apk-debug",
                        "-storetype pkcs12",
                        "-keystore <%= dir.src.certificates.android %>demo.p12",
                        "-storepass <%= password.certificate.android %>",
                        "<%= dir.deploy.android %>demo.apk",
                        "<%= dir.src.as %>classes/Main-app.xml",
                        "<%= dir.deploy.web.swf %>main.swf",
                        //"-extdir ${project-anes}",
                        "-C <%= dir.deploy.android %> <%= dir.deploy.icons %>",
                    ]
                },
                
                android_uninstall : {
                    args : [
                        "-uninstallApp",
                        "-platform android",
                        "-appid <%= project_package %>.<%= project_alias %>"
                    ]
                },

                android_install : {
                    args : [
                        "-installApp",
                        "-platform android",
                        "-package <%= dir.deploy.android %>"
                    ]
                },

                android_launch : {
                    args : [
                        "-launchApp",
                        "-platform android",
                        "-appid <%= project_package %>.<%= project_alias %>"
                    ]
                },
                

                
                ios_publish : {
                    args : [
                        "-package",
                        "-target ipa-debug-interpreter",
                        "-connect",
                        "-provisioning-profile <%= dir.src.certificates.ios %>demo.mobileprovision",
                        "-storetype pkcs12",
                        "-keystore <%= dir.src.certificates.ios %>demo.p12",
                        "-storepass <%= password.certificate.ios %>",
                        "<%= dir.deploy.ios %>demo.ipa",
                        "<%= dir.src.as %>classes/Main-app.xml",
                        "<%= dir.deploy.web.swf %>main.swf",
                        //"-extdir ${project-anes}",
                        "-C <%= dir.deploy.ios %> <%= dir.deploy.icons %>",
                    ]
                },
                
            },
            
            asdoc : {
                main : {
                    args : [
                        "-source-path <%= dir.src.as %>classes",
                        "-doc-sources <%= dir.src.as %>classes",
                        "-library-path <%= dir.src.as %>libs/swc/assets",
                        "-library-path <%= dir.src.as %>libs/swc/third-party",
                        "-output <%= dir.deploy.docs %>"
                    ]
                }
            },
            /*
            compc : {
                test1 : {
                    args : [
                        "-source-path <%= dir.src.as %>classes",  
                        "-include-classes Main",
                        "-directory=true",  
                        "-debug=false", 
                        "-output <%= dir.src.as %>libs/swc/custom"
                    ]
                }
            }
            */
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

    // Default
    grunt.registerTask('default', [     
        //'documentation',
        //'certificates',
        //'jshint',               
        //'web',        
        'desktop',
        //'devices',
        //'mobile'
        
    ]);

    // Web Task
    grunt.registerTask('web', ['sass', 'uglify', 'as3:mxmlc']);

    // Desktop Task
    grunt.registerTask('desktop', ['air']);
    
    // Mobile Task
    grunt.registerTask('mobile', ['android', 'ios']);

    //Devices
    grunt.registerTask('devices', ['as3:adt:devices']);

    // Android Task
    grunt.registerTask('android', ['as3:adt:android_publish', 
                                   //'as3:adt:android_uninstall', 
                                   'as3:adt:android_install',
                                   'as3:adt:android_launch']);

    // iOS Task
    grunt.registerTask('ios', ['as3:adt:ios_publish']);

    // AIR Task
    grunt.registerTask('air', ['as3:adt:air_publish']);

    // OSX Task
    grunt.registerTask('osx', ['as3:adt:air_publish_osx']);

    // Windows Task
    grunt.registerTask('windows', ['as3:adt:air_publish_windows']);

    // Library Task
    grunt.registerTask('library', ['as3:compc']); 

    // Documentation Task
    grunt.registerTask('documentation', ['as3:asdoc']);

    // Certificates Task
    grunt.registerTask('certificates', ['as3:adt:air_certificate']);
};
