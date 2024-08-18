import { encode } from ".";

export default function serializeHuffmanCode( huffmanCode )
{
	let bits = "";

	for( const key in huffmanCode )
	{
		const val = huffmanCode[ key ];

		// values holds calculated huffman codes which they can be
		// 2-11 bits mostly, so nearest border is 16 bits, we need
		// to pad with 0s to make it 16 bits
		const requiredBitNumbers = 16 - ( val.length % 16 );
		const encodedVal = val.padStart( val.length + requiredBitNumbers, "0" );

		// it's a 0-65536 number that represents the decimal code of
		// the character which is two byte is enough to represent it
		const encodedKey = parseInt( key )
			// convert to binary string
			.toString( 2 )
			// complete with leading zeros
			.padStart( 16, "0" );

		bits += encodedKey + encodedVal;
	}

	// we are sure the bits we have are multiples of 8,
	// so padding will be 0, we don't need padding data 
	return encode( bits )[ 0 ];
}
