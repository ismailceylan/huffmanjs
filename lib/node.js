/**
 * Represents a character and its frequency as a node
 * in the Huffman tree.
 */
export default class Node
{
	/**
	 * Creates a new instance.
	 *
	 * @param {string} char - The character represented by the node.
	 * @param {number} freq - The frequency of the character.
	 */
	constructor( char, freq )
	{
		this.char = char;
		this.freq = freq;

		/**
		 * The left children of the node.
		 * 
		 * @type {Node|null}
		 */
		this.left = null;

		/**
		 * The right children of the node.
		 * 
		 * @type {Node|null}
		 */
		this.right = null;
	}
}
