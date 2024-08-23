import { magic } from "./constants.js";
import { unserializeHuffmanCode, unserializeMetaLength } from "./index.js";

/**
 * Parses the compressed data to extract the meta information.
 *
 * @typedef {{padEnd:number,bitmap:{},raw:string}} Meta
 * @param {string} compressed - The compressed data to parse.
 * @throws {Error} If the compressed data format is unknown.
 * @throws {Error} If the compressed data is corrupted.
 * @return {Meta} The extracted meta information.
 */
export default function parseMeta( compressed )
{
	if( compressed.slice( 0, magic.length ) !== magic )
	{
		throw new Error( "Unknown file format!" );
	}

	const meta = {
		padEnd: compressed[ magic.length ].charCodeAt( 0 ),
	}

	const metaLength = unserializeMetaLength(
		compressed[ magic.length + 1 ] + compressed[ magic.length + 2 ]
	);

	const metaBlock = compressed.slice( magic.length + 3, magic.length + 3 + metaLength );

	// [ meta.padEnd, metaBlock ] = unserializeFilledBits( metaBlock );
	meta.bitmap = unserializeHuffmanCode( metaBlock );
	meta.raw = compressed.slice( magic.length + 3 + metaLength );

	return meta;
}
