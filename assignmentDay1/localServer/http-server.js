const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const morgan = require( 'morgan' );
const helmet = require( 'helmet' );
const uuid = require( 'uuid/v4' );
const xlsx = require("xlsx");
const {validate} = require( './schema' );
const {passport} = require( './auth' );

const app = express();
app.enable( 'trust proxy' ); // https://expressjs.com/en/guide/behind-proxies.html
app.use( bodyParser.urlencoded( {extended: false} ) );
app.use( bodyParser.json() );
app.use( morgan( 'common' ) );
app.use( helmet() );
app.use( passport.initialize() );

const workbook = xlsx.readFile("../data.csv");
const SheetName0 = workbook.SheetNames[0];
const Sheet0 = workbook.Sheets[SheetName0];

console.log(xlsx.utils.sheet_to_json(Sheet0));
console.log(xlsx.utils.sheet_to_csv(Sheet0));

const database = xlsx.utils.sheet_to_json(Sheet0);

app.get( '/', passport.authenticate( 'basic', {session: false} ), (req, res) => {
  res.json( {
    status: 'OK',
    data: Object.values( database ),
    count: Object.values( database ).length
  } )
} );

app.get( '/length', passport.authenticate( 'basic', {session: false} ), (req, res) => {
  res.json( {
    status: 'OK',
    count: Object.values( database ).length
  } )
} );

app.get( '/:id', (req, res) => {
  if ( !database[req.params.id] ) {
    res.statusCode = 404;
    res.end();
  }

  res.json( database[req.params.id] );
} );

app.post( '/login', passport.authenticate( 'basic', {session: false} ), (req, res) => {
  const valid = validate( req.body );

  if ( !valid ) {
    res.statusCode = 400;
    res.json( {
      status: 'ERROR',
      data: validate.errors
    } );

    return;
  }

  let id = uuid();

  if ( req.body['__id'] ) {
    id = req.body['__id']; // TODO validate uuid
  }

  database[id] = {__id: id, ...req.body};

  res.header( 'Location', id );

  res.json( {
    status: 'OK'
  } )
} );

app.listen( 8082, '127.0.0.1', () => {
  console.info( 'Started server' );
} );
