import { magic } from "./constants.js";
import { serializeHuffmanCode } from "./index.js";

/**
 * Builds a binary string by concatenating the magic string, meta separator,
 * encoded pads, meta separator, serialized bitmap, meta ends with, and encoded
 * values.
 *
 * @param {Encoded} encoded - An array containing the encoded values.
 * @param {Bitmap} bitmap - The bitmap object.
 * @return {[string,string,string]} The built binary strings.
 */
export default function buildBinary([ encoded, encodedPads ], bitmap )
{
	// serialized huffman code
	const [ encodedHuffman, encodedHuffmanLength ] = serializeHuffmanCode( bitmap );
	// encoded form of the added bits
	const padding = String.fromCharCode( encodedPads );

	const build =
	[
		magic,
		padding,
		encodedHuffmanLength,
		encodedHuffman,
		encoded
	];

	const onlyCompressed = 
	[
		magic,
		padding,
		encoded
	];

	return [
		build.join( "" ),
		onlyCompressed.join( "" ),
		encodedHuffman
	];
}

/**
 * @typedef {import("./generate-bitmap.js").Bitmap} Bitmap
 * @typedef {import("./encode.js").Encoded} Encoded
 */
