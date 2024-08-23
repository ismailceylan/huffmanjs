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

		// it's a 0-65535 number that represents the decimal code of
		// the character which is two byte is enough to represent it
		const encodedKey = parseInt( key )
			// convert to binary string
			.toString( 2 )
			// complete with leading zeros
			.padStart( 16, "0" );

		bits += encodedKey + encodedVal;
	}

	// we are sure the bits we have are multiples of 8,
	// so padding will be 0, we don't need padding length
	// but just the encoded data 
	const encoded = encode( bits )[ 0 ];

	// now we need to encode the encoded data length
	// so it can be used as a meta data on the binary
	// 2 byte space is enough to store it
	const encodedLength = encode(
		encoded
			.length
			.toString( 2 )
			.padStart( 16, "0" )
	)[ 0 ];

	return [ encoded, encodedLength ];
}
