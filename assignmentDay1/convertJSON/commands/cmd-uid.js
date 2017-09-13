const generateUid = require( '../uid' );
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = program => {
  program.command( 'uid' )
    .description( 'generate dhis2 compatible codes (UIDs)' )
    .option( '-s, --source [source]', 'number of UIDs to generate')
    .option( '--source-username [zzz]', 'number of UIDs to generate')
    .option( '--source-password [sourcePassword]', 'number of UIDs to generate')
    .option( '-t, --target [target]', 'number of UIDs to generate')
    .option( '--target-username [targetUsername]', 'number of UIDs to generate')
    .option( '--target-password [targetPassword]', 'number of UIDs to generate')
    .option( '-l, --limit [limit]', 'number of UIDs to generate', 10 )
    .option( '--json', 'output in json format', false )
    .option( '--csv', 'output in csv format', false )
    .action( async (args) => {
      const output = [];
      const source = args.source;
      const source_username = args['sourceUsername'];
      const source_password = args.sourcePassword;
      const target = args.target;
      const target_username = args.targetUsername;
      const target_password = args.targetPassword;
// fetch data from node server
// convert to DHIS2 format
// generate UUID
      //console.log(source_username);
      // for ( let i = 0; i < args.limit; i++ ) {
      //   output.push( generateUid() );
      // }

      const object = {
        organisationUnits : []
      }

      const mapping = [];
      const dataLength = 0;
      const getID_url = "https://play.dhis2.org/demo/api/system/id?limit=";

      const createAuthenticationHeader = (username, password) => {
        return "Basic " + new Buffer( username + ":" + password ).toString( "base64" );
      };

      // await fetch(source + "length/", {
      //   headers:{
      //     Authorization: createAuthenticationHeader (source_username , source_password) 
      //   }
      // })
      // .then(function(res) {
      //   return res.json();
      // })
      // .then(json =>{
      //   console.log(json);
      //   dataLength = json.count;
      // });
      
      // await fetch(getID_url + dataLength, {
      //   headers:{
      //     Authorization: createAuthenticationHeader (target_username , target_password) 
      //   }
      // })
      // .then(function(res) {
      //   return res.json();
      // })
      // .then(json =>{
      //   console.log(json);
      // });

      await fetch(source, {
        headers:{
          Authorization: createAuthenticationHeader (source_username , source_password) 
        }
      })
      .then(function(res) {
        return res.json();
      })
      .then(json =>{
        console.log(json);
        json.data.forEach(item => {
          object.organisationUnits.push(
            {
              name: item.NAME,
              shortName: item.SHORT_NAME,
              openingDate: item.openingDate
            }
          )
        })
      });

      //console.log(object.organisationUnits.length);

      await fetch(target, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          Authorization: createAuthenticationHeader (target_username , target_password) 
        },
        body: JSON.stringify(object)
      })
      .then(function(res) {
        return res.json();
      })
      .then(json =>{
        console.log(json);
      });

      // if ( args.json ) {
      //   console.log( JSON.stringgify( {codes: output} ) );
      // } else if ( args.csv ) {
      //   console.log( 'codes' );
      //   output.forEach( c => console.log( c ) );
      // } else {
      //   console.log( output.join( ' ' ) );
      // }

    } );
};

//d2-generator uid -s http://localhost:8082/ --source-username admin --source-password admin -t https://play.dhis2.org/dev/api/metadata --target-username admin --target-password district