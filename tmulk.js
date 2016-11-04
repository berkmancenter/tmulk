#!/usr/bin/env node

const fs = require( 'fs' );
const path = require( 'path' );

const pkg = require( path.join( __dirname, 'package.json' ) );

const program = require( 'commander' );

const Twitter = require( 'twitter' );

program
  .version( pkg.version )
  .usage( '<username ...>' )
  .parse( process.argv );

if ( !program.args.length ) {
  program.help();
}

let client = new Twitter( {
  consumer_key: '',
  consumer_secret: '',
  access_token: '',
  access_token_secret: ''
} );

for ( var handle of program.args ) {
  console.log( `now downloading ${ handle }` );

  client.get( 'statuses/user_timeline', {
    screen_name: handle
  }, function( error, tweets, response ) {
    if ( !error ) {
      console.log( tweets );
    } else {
      console.log( error );
    }
  } );
}
