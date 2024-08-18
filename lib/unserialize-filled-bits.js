
/**
 * Extracts the filled bits from the given data.
 *
 * @param {string} binary - The data to unserialize.
 * @throws {Error} If the data padding is not found.
 * @returns {[number,string]} An array containing the filled bits number
 * and the remaining data.
 */
export default function unserializeFilledBits( binary )
{
	const padding = binary[ 0 ].charCodeAt( 0 );

	if( /[0-7]/.test( binary[ 0 ]))
	{
		throw new Error( "Invalid padding data!" );
	}

	return [
		parseInt( padding ),
		binary.slice( 1 )
	];
}
