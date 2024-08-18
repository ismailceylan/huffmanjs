export default function unserializeHuffmanCode( encoded )
{
	const bitmap = {}
	let bits = "";

	// we have to unveil the ones and zeros as string from the encoded data
	for( const byte of encoded )
	{
		bits += byte
			// convert ascii code
			.charCodeAt( 0 )
			// convert to binary string
			.toString( 2 )
			// complete with leading zeros
			.padStart( 8, "0" );
	}

	// we have to read sequentially from the binary string to rebuild
	// huffman code map. When we serialized it, we used 16 bits for the
	// key and 16 bits for the huffman code, so every 32 bits represents
	// an entry of the map like {211:"10011"}
	for( let i = 0; i < bits.length; i += 32 )
	{
		// first 16 bits are the key
		const keyBits = bits.slice( i, i + 16 );
		// and 16 bits after that are the huffman code
		const valBits = bits.slice( i + 16, i + 32 );
		// zeroes at the beginning of the key will be ignored
		// by parseInt so we don't need to remove them manually
		const key = parseInt( keyBits, 2 );
		// we padded huffman code bits with zeroes and those will be
		// problem for us, we should've to get rid of leading zeroes
		const val = valBits.replace( /^0*(.*)/, "$1" );

		// add to the map
		bitmap[ val ] = key;
	}

	return bitmap;
}
