import { magic, metaEndsWith } from "./constants.js";
import { unserializeFilledBits, unserializeHuffmanCode } from "./index.js";

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
	const meta = {}

	if( compressed.slice( 0, magic.length ) !== magic )
	{
		throw new Error( "Unknown file format!" );
	}

	const metaEndingPos = compressed.indexOf( metaEndsWith );

	if( metaEndingPos === -1 )
	{
		throw new Error( "Meta ending not found!" );
	}

	let metaBlock = compressed.slice( magic.length, metaEndingPos );

	[ meta.padEnd, metaBlock ] = unserializeFilledBits( metaBlock );
	meta.bitmap = unserializeHuffmanCode( metaBlock );
	meta.raw = compressed.slice( metaEndingPos + metaEndsWith.length );

	return meta;
}
