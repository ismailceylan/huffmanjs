/**
 * Converts given characters into a string of bits using a provided bitmap.
 *
 * @param {string} data - The characters to convert.
 * @param {Record<string, string>} bitmap - The bitmap used to convert the characters into bits.
 * @return {string} The resulting string of bits.
 */
export default function convertBits( data, bitmap )
{
	let stack = "";

	for( const chr of data )
	{
		stack += bitmap[ chr ];
	}

	return stack;
}
