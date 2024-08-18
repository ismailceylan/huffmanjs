/**
 * Decodes the given data.
 *
 * @param {Meta} meta - The metadata of the compressed data.
 * @return {string}
 */
export default function decode( meta )
{
	let bits = "";

	for( const char of meta.raw )
	{
		bits += char
			.charCodeAt( 0 )
			.toString( 2 )
			.padStart( 8, "0" );
	}

	if( meta.padEnd > 0 )
	{
		bits = bits.slice( 0, -meta.padEnd );
	}

	let stack = [];
	let tmp = "";

	for( const bit of bits )
	{
		tmp += bit;

		const chr = meta.bitmap[ tmp ];

		if( chr !== undefined )
		{
			stack.push( String.fromCharCode( chr ));
			tmp = "";
		}
	}

	return stack.join( "" );
}

/**
 * @typedef {import("./parse-meta").Meta} Meta
 */
