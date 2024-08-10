export default function compress( data )
{
	data = data
		.split( "" )
		.map( i =>
			i.charCodeAt( 0 )
		);

}
