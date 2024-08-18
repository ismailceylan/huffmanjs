import { Node, sort } from "./index.js";

/**
 * Generates a linked list of nodes from the given frequencies object.
 *
 * @param {Frequencies} frequencies - An object containing characters and their frequencies.
 * @return {Node[]} - An array of nodes representing the linked list.
 */
export default function nodify( frequencies )
{
	const nodes = Object
		.keys( frequencies )
		.map(char => new Node( char, frequencies[ char ]))
		.sort( sort );

	// let's convert nodes to linked list while we built the huffman tree
	while( nodes.length > 1 )
	{
		const left = nodes.shift();
		const right = nodes.shift();
		const newNode = new Node( null, left.freq + right.freq );

		newNode.left = left;
		newNode.right = right;

		nodes.push( newNode );
		nodes.sort(sort );
	}

	return nodes;
}

/**
 * @typedef {import("./get-frequency.js").Frequencies} Frequencies
 */