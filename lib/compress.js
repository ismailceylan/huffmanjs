import { 
	getFrequency, 
	nodify,
}
	from "./index.js";

export default function compress( data )
{
	data = data
		.split( "" )
		.map( i =>
			i.charCodeAt( 0 )
		);

	const frequencies = getFrequency( data );
	const nodes = nodify( frequencies );
}
