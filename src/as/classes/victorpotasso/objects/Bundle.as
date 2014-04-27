package victorpotasso.objects
{
	/**
	 * @author victorpotasso
	 */
	public class Bundle 
	{
		private static var data : Array = [];
		
		public static function putExtra( p_keyName : String, p_value : Object ):void
		{
			data[p_keyName] = p_value;
		}
		
		public static function getExtra( p_keyName : String ) : Object
		{
			return data[p_keyName];
		}
		
		public static function getString( p_keyName : String ) : String
		{
			return String(data[p_keyName]);
		}
		
		public static function getBoolean( p_keyName : String ) : Boolean
		{
			return Boolean(data[p_keyName]);
		}
		
		public static function getNumber( p_keyName : String ) : Number
		{
			return Number(data[p_keyName]);
		}
	}
}
