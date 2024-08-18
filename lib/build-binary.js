import { magic, metaEndsWith } from "./constants.js";
import { serializeHuffmanCode } from "./index.js";
export default function buildBinary([ encoded, encodedPads ], bitmap )
{
	const build =
	[
		// magic bytes
		magic,
		// zero padding as character
		String.fromCharCode( encodedPads ),
		// serialized huffman code
		serializeHuffmanCode( bitmap ),
		// meta ending declaration
		metaEndsWith,
		// encoded data
		encoded
	];

	return build.join( "" );
}
