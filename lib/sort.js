/**
 * Sorts two objects based on their 'freq' property in ascending order.
 *
 * @param {Node} a - The first object to compare.
 * @param {Node} b - The second object to compare.
 * @return {number}
 */
export default function sort( a, b )
{
	return a.freq - b.freq;
}

/**
 * @typedef {import(".").Node} Node
 */
