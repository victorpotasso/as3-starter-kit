package 
{
    import flash.events.Event;
    import flash.events.MouseEvent;
    import flash.display.Sprite;

    import com.greensock.TweenMax;
    import com.greensock.easing.Elastic;
    
    import victorpotasso.assets.AWelcome; 

    /**
     * @author victorpotasso
     */
     
    [SWF(width=500, height=500, backgroundColor='#FFFFFF', frameRate=30)]
    public class Main extends Sprite 
    {
        private var welcome : AWelcome;

        public function Main() 
        {
            addEventListener(Event.ADDED_TO_STAGE, create);
        }

        private function create(evt : Event) : void 
        {
            removeEventListener(Event.ADDED_TO_STAGE, create);
            
            welcome = new AWelcome();
            addChild(welcome);

            welcome.addEventListener(MouseEvent.MOUSE_OVER, over);
            welcome.addEventListener(MouseEvent.MOUSE_OUT, out);
        }

        private function over(evt:MouseEvent) : void
        {
            TweenMax.to(evt.target, .5, {scaleX:1.1, scaleY:1.1, ease:Elastic.easeOut});
        }

        private function out(evt:MouseEvent) : void
        {
            TweenMax.to(evt.target, .5, {scaleX:1, scaleY:1, ease:Elastic.easeOut});
        }
    }                                                                            
}                                      
