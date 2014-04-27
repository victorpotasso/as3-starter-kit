$( document ).ready(function() {
     
});

var flashvars =
{
    debug: "true"
};

var params = 
{
    menu: "false",
    scale: "noScale",
    allowFullscreen: "true",
    wmode: "transparent",
    allowScriptAccess: "always"
};

var attributes = 
{				 
    id: 'flash',
    allownetworking:'all' 
};

swfobject.embedSWF("assets/swf/main.swf?n="+parseInt(Math.random()*1000), "content_flash", "500", "500", "11.1", "", flashvars, params, attributes);
