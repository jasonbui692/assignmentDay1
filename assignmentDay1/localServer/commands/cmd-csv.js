const generateUid = require( '../uid' );

module.exports = program => {
  program.command( 'uid' )
    .description( 'generate dhis2 compatible codes (UIDs)' )
    .option( '-l, --limit [limit]', 'number of UIDs to generate', 10 )
    .option( '--json', 'output in json format', false )
    .option( '--csv', 'output in csv format', false )
    .action( args => {
      const output = [];

      for ( let i = 0; i < args.limit; i++ ) {
        output.push( generateUid() );
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