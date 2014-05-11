package 
{
    import flash.events.Event;
    import flash.events.MouseEvent;
    import flash.display.Sprite;

    import com.greensock.TweenMax;
    import com.greensock.easing.Elastic;
    
    import br.victorpotasso.as3starterkit.assets.AWelcome; 

    import sweatless.graphics.SmartCircle;

    /**
     * @author victorpotasso
     */
     
    [SWF(width=500, height=500, backgroundColor='#FFFFFF', frameRate=30)]
    public class Main extends Sprite
    {
        private var welcome : AWelcome;
        private var circle  : SmartCircle;

        public function Main() 
        {
            super();
            addEventListener(Event.ADDED_TO_STAGE, create);
        }

        private function create(evt:Event):void
        {
            removeEventListener(Event.ADDED_TO_STAGE, create);

            //welcome 

            welcome = new AWelcome();
            addChild(welcome);

            welcome.addEventListener(MouseEvent.MOUSE_OVER, over);
            welcome.addEventListener(MouseEvent.MOUSE_OUT, out);

            //circle

            circle = new SmartCircle(200, 200, 0, 360);
            addChild(circle);
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
