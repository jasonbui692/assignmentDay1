#!/usr/bin/env node

const program = require( 'commander' );
const commandUid = require( './commands/cmd-uid' );
const commandUuid = require( './commands/cmd-uuid' );

program.version( '0.1.0' );

commandUid( program );
commandUuid( program );

program.parse( process.argv );

if ( !process.argv.slice( 2 ).length ) {
  program.outputHelp();
}
