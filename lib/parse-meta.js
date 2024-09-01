import { magic } from "./constants.js";
import { unserializeHuffmanCode, unserializeMetaLength } from "./index.js";

/**
 * Parses the compressed data to extract the meta information.
 *
 * @typedef {{padEnd:number,bitmap:{},raw:string}} Meta
 * @param {string} compressed - The compressed data to parse.
 * @param {string} [huffmanCode] - The Huffman code of the compressed data.
 * @throws {Error} If the compressed data format is unknown.
 * @throws {Error} If the compressed data is corrupted.
 * @return {Meta} The extracted meta information.
 */
export default function parseMeta( compressed, huffmanCode )
{
	if( compressed.slice( 0, magic.length ) !== magic )
	{
		throw new Error( "Unknown file format!" );
	}

	const meta =
	{
		padEnd: compressed[ magic.length ].charCodeAt( 0 ),
	}

	const metaLength = (() =>
	{
		if( huffmanCode )
		{
			return huffmanCode.length;
		}

		return unserializeMetaLength(
			compressed[ magic.length + 1 ] + compressed[ magic.length + 2 ]
		);
	})();

	const metaBlock = (() =>
	{
		if( huffmanCode )
		{
			return huffmanCode;
		}

		return compressed.slice( magic.length + 3, magic.length + 3 + metaLength );
	})();

	meta.bitmap = unserializeHuffmanCode( metaBlock );
	
	meta.raw = (() =>
	{
		if( huffmanCode )
		{
			return compressed.slice( magic.length + 1 );
		}

		return compressed.slice( magic.length + 3 + metaLength );
	})();

	return meta;
}
