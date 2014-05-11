package 
{
    import flash.display.Sprite;
    import flash.display.StageAlign;
    import flash.display.StageScaleMode;
    import flash.events.Event;
    
    import br.com.stimuli.loading.BulkLoader;
    import br.com.stimuli.loading.BulkProgressEvent;
    
    import br.victorpotasso.as3starterkit.objects.Bundle;
    import br.victorpotasso.as3starterkit.assets.APreloader;

    [SWF(width=500, height=500, backgroundColor='#FFFFFF', frameRate=30)]
    public class Preloader extends Sprite
    {
        private const DEBUG : String = "debug";
        private const FILE  : String = "file"

        private var bulkLoader : BulkLoader;
        private var debug      : Boolean;
        private var file       : String;
        
        public var movLoading  : APreloader;
        
        public function Preloader()
        {
            debug = Boolean(loaderInfo.parameters[DEBUG]);
            file  = String(loaderInfo.parameters[FILE]);
            
            movLoading = new APreloader();
            addChild(movLoading);
            movLoading.x = stage.stageWidth >> 1;
            movLoading.y = stage.stageHeight >> 1;
            movLoading.stop();
            
            bulkLoader = BulkLoader.createUniqueNamedLoader();
            
            movLoading.txtPorcent.text = "";
            
            stage ? startLoading() : addEventListener(Event.ADDED_TO_STAGE, startLoading);  
        }
        
        private function startLoading( evt : Event = null ) : void 
        {
            stage.scaleMode = StageScaleMode.EXACT_FIT;
            stage.align = StageAlign.TOP;
            
            bulkLoader.add(file+"?n="+Math.random()*9999, {id:FILE});
            bulkLoader.addEventListener(BulkProgressEvent.PROGRESS, onProgressApp);
            bulkLoader.addEventListener(Event.COMPLETE, onComplete);
            bulkLoader.start();
        }
        
        private function destroy() : void 
        {
            if(movLoading)
            {
                    removeChild(movLoading);
                    movLoading=null;
            }
            
            if(bulkLoader)
            {
                    bulkLoader.clear();
            }
        }
        
        private function onProgressApp( evt : BulkProgressEvent ) : void 
        {
            movLoading.txtPorcent.text = String( Math.round(evt.percentLoaded*100) );
        }
        
        private function onComplete( evt : Event ) : void 
        {
            bulkLoader.removeEventListener(BulkProgressEvent.PROGRESS, onProgressApp);
            bulkLoader.removeEventListener(Event.COMPLETE, onComplete);
            
            Bundle.putExtra(DEBUG, debug);
            
            addChild( bulkLoader.getContent(FILE) );
            
            destroy();
        }
    }
}
