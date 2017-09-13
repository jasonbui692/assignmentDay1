const fs = require( "fs" );
const path = require( "path" );
const ljf = require( "load-json-file" );

const ajv = new require( "ajv" )( {
  allErrors: true,
  useDefaults: true,
  format: "full"
} );

const schema = ljf.sync( path.join( __dirname, 'schema.json' ) );
const validate = ajv.compile( schema );

module.exports = {
  validate
};