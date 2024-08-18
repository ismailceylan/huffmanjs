/**
 * Calculates the frequency of each character in the given data.
 *
 * @typedef {Record<string, number>} Frequencies
 * @param {string} data - The input string to calculate the frequency
 * of characters.
 * @return {Frequencies} An object where each key represents a character
 * and its value represents the frequency of that character in the input data.
 */
export default function getFrequency( data )
{
	const freq = {}

	for( let i = 0; i < data.length; i++ )
	{
		const letter = data[ i ];

		if( freq[ letter ])
		{
			freq[ letter ]++;
		}
		else
		{
			freq[ letter ] = 1;
		}
	}

	return freq;
}
