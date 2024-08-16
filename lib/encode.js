export default function encode( bits )
{
	const stack = [];
	let padLen = 0;

	for( let i = 0; i < bits.length; i += 8 )
	{
		let byte = bits.slice( i, i + 8 );

		if( byte.length < 8 )
		{
			padLen = 8 - byte.length;
			byte = byte.padEnd( 8, "0" );
		}

		const ascii = parseInt( byte, 2 );
		const char = String.fromCharCode( ascii );

		stack.push( char );
	}

	return [ stack.join( "" ), padLen ];
}
