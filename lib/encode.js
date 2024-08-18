/**
 * Encodes a binary string into an ASCII string and returns the encoded 
 * string and the number of padding zeros.
 * 
 * @typedef {[string,number]} Encoded
 * @param {string} bits - The binary string to encode.
 * @return {Encoded} An array containing the encoded ASCII string
 * and the number of padding zeros.
 */
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
