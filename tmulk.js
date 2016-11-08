#!/usr/bin/env node

const fs = require( 'fs' );
const path = require( 'path' );

const pkg = require( path.join( __dirname, 'package.json' ) );

const program = require( 'commander' );

const Twitter = require( 'twitter' );
const twitterCreds = require( './twitter.json' );
const tweetAttributes = [ 'id', 'text', 'source', 'retweet_count', 'favorite_count' ];

program
  .version( pkg.version )
  .usage( '<username ...>' )
  .parse( process.argv );

if ( !program.args.length ) {
  program.help();
}

let client = new Twitter( twitterCreds );

for ( var handle of program.args ) {
  //console.log( `now downloading ${ handle }` );
  let timelineReq = {
    screen_name: handle,
    count: 2
  };

  client.get( 'statuses/user_timeline', timelineReq, function( error, tweets, response ) {
    if ( !error ) {
      //console.log( JSON.stringify( tweets.map( function( t ) {
      console.log( tweets.map( function( t ) {
        return {
          created_at: t.created_at,
          id: t.id,
          text: t.text,
          source: t.source,
          retweet_count: t.retweet_count,
          favorite_count: t.favorite_count
        }
      } ) );
      //} ) ) );

      if ( tweets.length === 2 ) {
        console.log( 'There are more' );
      }

    } else {
      console.log( error );
    }
  } );
}
