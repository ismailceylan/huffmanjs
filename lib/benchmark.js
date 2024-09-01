/**
 * A repository of benchmark results for named benchmark method calls.
 * 
 * @type {Record<string|symbol, number>}
 */
export const captures = {}

/**
 * Benchmarks the execution time of a given job.
 *
 * @template T
 * @param {string|() => T} nameOrJob
 * @param {() => T} [job] - The function to be benchmarked.
 * @returns {[T, number]} An array containing the time taken to execute the job and the result of the job.
 */
export default function benchmark( nameOrJob, job, { stack = false, average = false } = {})
{
	if( typeof nameOrJob === "function" )
	{
		job = nameOrJob;
		nameOrJob = "anonymous";
	}

	const start = performance.now();
	const result = job();

	captures[ nameOrJob ] = stack
		? ( captures[ nameOrJob ] || 0 ) + ( performance.now() - start )
		: average
			? (( captures[ nameOrJob ] || 0 ) + ( performance.now() - start )) / 2
			: performance.now() - start;

	return [ result, performance.now() - start ];
}
