import { generateBitmap, getFrequency,  convertBits, nodify, encode, buildBinary } from "./index.js";

/**
 * Compresses the given data using Huffman encoding.
 *
 * @param {string} data - The data to be compressed.
 * @return {[string,Bitmap,string,string]} An array containing
 * the compressed binary data and the Huffman code bitmap.
 */
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
	const [ fullBinary, onlyCompressed, encodedHuffmanCodes ] = buildBinary( encoded, bitmap );
	
	return [
		fullBinary,
		bitmap,
		onlyCompressed,
		encodedHuffmanCodes
	];
}

/**
 * @typedef {import("./generate-bitmap.js").Bitmap} Bitmap
 */
