export default function generateBitmap( nodes )
{
	const codes = {}

	walk( nodes[ 0 ]);

	function walk( node, code = "1" )
	{
		if( node === null )
		{
			return;
		}

		if( node.char !== null )
		{
			codes[ node.char ] = code;
		}

		walk( node.left, code + "1" );
		walk( node.right, code + "0" );
	}

	return codes;
}
