export default function convertBits( data, bitmap )
{
	let stack = "";

	for( const chr of data )
	{
		stack += bitmap[ chr ];
	}

	return stack;
}
