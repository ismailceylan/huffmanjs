/**
 * Generates a bitmap of characters and their corresponding Huffman codes.
 *
 * @param {[Node]} nodes - An array of Huffman tree nodes.
 * @return {Bitmap} - An object mapping characters to their corresponding
 * Huffman codes.
 */
export default function generateBitmap( nodes )
{
	const codes = {}

	walk( nodes[ 0 ]);

	/**
	 * Recursively traverses a binary tree and generates a bitmap
	 * of characters and their corresponding Huffman codes.
	 *
	 * @param {Node} node - The current node being traversed.
	 * @param {string} code - The current Huffman code being generated.
	 * Defaults to an empty string.
	 * @return {void} This function does not return anything.
	 */
	function walk( node, code = "1" )
	{
		if( node === null )
		{
			return;
		}

		if( node.char !== null )
		{
			codes[ node.char ] = code;
		}

		walk( node.left, code + "1" );
		walk( node.right, code + "0" );
	}

	return codes;
}

/**
 * @typedef {import(".").Node} Node
 * @typedef {Record<string, string>} Bitmap
 */
