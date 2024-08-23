import { magic } from "./constants.js";
import { serializeHuffmanCode } from "./index.js";

/**
 * Builds a binary string by concatenating the magic string, meta separator,
 * encoded pads, meta separator, serialized bitmap, meta ends with, and encoded
 * values.
 *
 * @param {Encoded} encoded - An array containing the encoded values.
 * @param {Bitmap} bitmap - The bitmap object.
 * @return {string} The built binary string.
 */
export default function buildBinary([ encoded, encodedPads ], bitmap )
{
	// serialized huffman code
	const [ encodedHuffman, encodedHuffmanLength ] = serializeHuffmanCode( bitmap );

	const build =
	[
		magic,
		String.fromCharCode( encodedPads ),
		encodedHuffmanLength,
		encodedHuffman,
		encoded
	];

	return build.join( "" );
}

/**
 * @typedef {import("./generate-bitmap.js").Bitmap} Bitmap
 * @typedef {import("./encode.js").Encoded} Encoded
 */
