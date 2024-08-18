import { generateBitmap, getFrequency,  convertBits, nodify, encode, buildBinary } from "./index.js";
export default function compress( data )
{
	data = data
		.split( "" )
		.map( i =>
			i.charCodeAt( 0 )
		);

	const frequencies = getFrequency( data );
	const nodes = nodify( frequencies );
	const bitmap = generateBitmap( nodes );
	const bits = convertBits( data, bitmap );
	const encoded = encode( bits );

	return [
		buildBinary( encoded, bitmap ),
		bitmap
	];
}
