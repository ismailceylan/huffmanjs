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
