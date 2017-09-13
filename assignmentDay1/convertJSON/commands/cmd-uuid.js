const uuid = require( 'uuid/v4' );

module.exports = program => {
  program.command( 'uuid' )
    .description( 'generate UUIDs' )
    .option( '-l, --limit [limit]', 'number of UUIDs to generate', 10 )
    .option( '--json', 'output in json format', false )
    .option( '--csv', 'output in csv format', false )
    .action( args => {
      const output = [];

      for ( let i = 0; i < args.limit; i++ ) {
        output.push( uuid() );
      }

      if ( args.json ) {
        console.log( JSON.stringify( {codes: output} ) );
      } else if ( args.csv ) {
        console.log( 'codes' );
        output.forEach( c => console.log( c ) );
      } else {
        console.log( output.join( ' ' ) );
      }
    } );
};