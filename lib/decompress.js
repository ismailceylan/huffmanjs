import { decode, parseMeta } from "./index.js";

/**
 * Decompresses the given compressed data by parsing the meta
 * information and then decoding it.
 *
 * @param {string} compressed - The compressed data to be decompressed.
 * @return {string} A promise that resolves to the decompressed data.
 */
export default function decompress( compressed )
{
	return decode( parseMeta( compressed ));
}
