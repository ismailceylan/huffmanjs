/**
 * Unserializes the meta length from the given encoded string.
 *
 * @param {string} encoded - The encoded string containing the meta length.
 * @return {number} The unserialized meta length.
 */
export default function unserializeMetaLength( encoded )
{
	let metaLength = encoded.split( "" ).map( c =>
		c.charCodeAt( 0 )
	);

	if( metaLength[ 0 ] > 0 )
	{
		metaLength[ 0 ] *= 255;
		metaLength[ 0 ]++;
	}

	return metaLength.reduce(( a, b ) => a + b, 0 );
}
