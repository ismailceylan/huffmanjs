import { compress, decompress, serializeHuffmanCode } from "./lib";

const editor = document.getElementById( "editor" );
const source = document.getElementById( "source" );
const origsize = document.getElementById( "origsize" );
const compsize = document.getElementById( "compsize" );
const ratio = document.getElementById( "ratio" );
const comptime = document.getElementById( "comptime" );
const matches = document.getElementById( "matches" );
const hex = document.getElementById( "hex" );
const bin = document.getElementById( "bin" );

editor.addEventListener( "input", update );

update();

function update()
{
	const text = editor.value;

	if( text )
	{
		const s = performance.now();
		const [ compressed, huffmanCode ] = compress( text );
		const decoded = decompress( compressed );
		const e = performance.now();

		source.innerHTML = JSON.stringify( huffmanCode );
		origsize.innerHTML = text.length;
		compsize.innerHTML = compressed.length;
		ratio.innerHTML = Math.round( 100 - ( compressed.length * 100 / text.length ));
		comptime.innerHTML = (e - s).toFixed( 2 ) + "ms";
		bin.textContent = compressed;

		hexify( compressed );

		if( decoded === text )
		{
			matches.classList.add( "yes" );
		}
	}
	else
	{
		source.innerHTML = "";
		hex.innerHTML = "";
		bin.innerHTML = "";
		origsize.innerHTML = "0";
		compsize.innerHTML = "0";
		ratio.innerHTML = "0";
		comptime.innerHTML = "0";

		matches.classList.remove( "yes" );
	}
}

function hexify( data )
{
	hex.innerHTML = "";

	data = data
		.split( "" )
		.map( i => i.charCodeAt( 0 ).toString( 16 ).toUpperCase().padStart( 2, "0" ))
		.forEach( h =>
		{
			const el = document.createElement( "span" );
			el.textContent = h;

			hex.appendChild( el );
		});
}
